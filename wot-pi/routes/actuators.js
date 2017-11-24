var express = require('express'),
router = express.Router();
resources = require('./../resources/model');
var request = require('request');
var model = resources.pi.actuators;

router.route('/').get(function (req, res, next){
    req.result = resources.pi.actuators;
  //  next();
});
router.route('/lights').get(function (req, res, next){
    res.send(resources.pi.actuators.lights);
  //  next();
});


// router.route('/lights').get(function (req, res, next){
//   request('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/', function (error, response, body) {
// if (!error && response.statusCode == 200) {
//    var info = JSON.parse(body)
//   // do more stuff
//   res.send(info);
// }
// })
// });

router.route('/lights/:id').get(function (req, res, next){
  request('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/', function (error, response, body) {
if (!error && response.statusCode == 200) {
   var info = JSON.parse(body)
  // do more stuff
  res.send(info);
}
})
});

router.route('/lights/:id/state').get(function (req, res, next){
  res.send(model.lights[req.params.id].state);

}).put(function(req,res,next){

 var myLed = model.lights[req.params.id].state;
 myLed.on = req.body.on;



 console.info('put request done');
    res.send(myLed.on);
});

module.exports = router;
