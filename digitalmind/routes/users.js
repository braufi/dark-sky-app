var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//getting the model
const User = require('../models/User');

/* GET users listing. */
router.get('/login', (req, res, next) => res.render('login'));
router.get('/register', (req, res, next) => res.render('register'));

//Register handler
router.post('/register', (req, res, next) => {
  //console.log(req.body);
  //res.send('Testing posts!')

  const {name, email, password, password2} = req.body
  let errors = [];

  //checking required fields
  if(!name || !email || !password || !password2){
    errors.push({msg: 'Please fil in all fields!'});
  }
  //check for passwords matching
  if(password!==password2){
    errors.push({msg: 'Passwords do not match!'});
  }

  //checking for password length
  if(password.length < 6){
    errors.push({msg: 'Passwords should be more than six characters!'});
  }

  if(errors.length > 0){
    res.render('register',{
      errors,
      name,
      email,
      password,
      password2
    });
  }
  else{
    //Validation passed, register to Mongo
    User.findOne({email: email})
      .then(user =>{
        if(user){
          //User already exists post an error
          errors.push({msg: 'User with that e-mail already exists!'})
          res.render('register',{
            errors,
            name,
            email,
            password,
            password2
          });
        } else{
            const newUser = new User({
              name,
              email,
              password
            });
            //console.log(newUser);
            //res.send('Registration Succesfull!')
            //Password hashing
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  newUser.password = hash;

                  //saving user
                  newUser.save()
                    .then(user => {
                      req.flash('success_msg', 'You are now registered...');
                      res.redirect('/users/login');
                    })
                    .catch(err => console.log(err))
                }))
        }
      })
  }
})
//Login handle 
router.post('/login', (req, res,next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next)
});

//Logout handle 
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You have successfully logged out!');
  res.redirect('/users/login');
});
module.exports = router;
