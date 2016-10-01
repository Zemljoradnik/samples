var express = require('express');
var ratesGenerator = require('./ratesGenerator');

ratesGenerator.init();
var server = express();
// enable CORS (as Chrome sees requests in localhost as cross origin)
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    next();
}
server.use(allowCrossDomain);

server.get('/rates', function(req, res) {
    res.jsonp({
        rates: ratesGenerator.getCurrentRates(),
    });
})

server.listen(3000, function() {
    console.log('Server is running on port 3000.');
})
