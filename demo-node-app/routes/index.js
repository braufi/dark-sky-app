const path = require('path');
const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const {body, validationResult} = require('express-validator/check');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});


const router = express.Router();
const Registration = mongoose.model('Registration');

router.get('/', (req, res) => {
  res.render('form', {title: 'Registration Form'})
});
//Listing registrationSchema
router.get('/registrations', auth.connect(basic), (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});
router.post('/',
[
  body('name')
    .isLength({min: 1})
    .withMessage('Please provide a name!'),
  body('email')
    .isLength({min: 1})
    .withMessage('Please provide an e-mail!'),
],
(req, res) => {
  const errors = validationResult(req);
  const registration = new Registration(req.body);
  if(errors.isEmpty()){
    //adding to DATABASE
    registration.save()
      .then(() => {res.send('Thank you for your registration!'); })
      .catch(() => {res.send('Something went wrong!'); });
  }
  else{
  console.log(req.body);
  res.render('form', {
    title: 'Registration Form',
    errors: errors.array(),
    data: req.body,
  });
  }
});

module.exports = router;
