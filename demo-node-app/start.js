require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`MongoDB connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Error occured on ${err.message}`);
  });
require('./models/Registration');
const app = require('./app');
const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
