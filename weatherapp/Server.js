var express = require('express');

const app = express();
const credentials = require('./apiCredentials.json');

app.use(express.static('/public'));

app.get('/weather', (req, res) => {

});

app.listen(3000, () => { console.info('Listening on port :3000'); });