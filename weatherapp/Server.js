const express = require('express');
var Request = require("request");
var path = require('path');

//Routes
var indexRouter = require('./routes/index');

require('dotenv').config();

const credentials = require('./apiCredentials.json');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;