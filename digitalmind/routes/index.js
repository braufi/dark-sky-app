var express = require('express');
var router = express.Router();
const {ensureAutheticated} = require('../config/auth');

/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'Welcome to Digitalmind' }));

//Dashboard page
router.get('/dashboard',  ensureAutheticated, (req, res, next) => res.render('dashboard', {name : req.user.name}));

module.exports = router;
