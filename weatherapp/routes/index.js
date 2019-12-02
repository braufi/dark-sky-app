var express = require('express');
var router = express.Router();

var DarkSky = require('../lib/darksky-api')

var ds = new DarkSky('5b5a4a4a8501d9cb752b3a997cf2027c');
var fc, tm;

ds.forecast(33.9, -84.3, { exclude: [ 'minutely', 'hourly', 'daily', 'alerts', 'flags' ] }, function(err, forecast){
    //console.log('forecast', forecast);
    fc += JSON.parse(forecast);
});

ds.timemachine(33.9, -84.3, new Date(), {exclude: [ 'minutely', 'hourly', 'alerts', 'flags' ] }, function(err, forecast){
    //console.log('timemachine', forecast);
    tm += JSON.parse(forecast);
})

router.get('/', (req, res, next) => res.render('index', {
    fcJSON: fc,
    tmJSON:tm
}));

module.exports = router;