var express = require('express'),
router = express.Router();
resources = require('./../resources/model');
var request = require('request');

router.route('/').get(function (req, res, next){
    req.result = resources.pi.actuators;
    next();
});

router.route('/lights').get(function (req, res, next){
  request('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/', function (error, response, body) {
if (!error && response.statusCode == 200) {
   var info = JSON.parse(body)
  // do more stuff
  res.send(info);
}
})
});

router.route('/lights/:id').get(function (req, res, next){
  request('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/', function (error, response, body) {
if (!error && response.statusCode == 200) {
   var info = JSON.parse(body)
  // do more stuff
  res.send(info);
}
})
});

/*
exports.onOffLight = function(url,state,val){
  console.log(url);
    request.put(
      url, {
        json: {
        "on": state,
        "hue": val
        }
      },
      function(error,response,body){
        if(!error && response.statusCode == 200){

        }
      }
    );
};
*/


module.exports = router;
