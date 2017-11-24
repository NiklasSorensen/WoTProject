var express = require('express'),
router = express.Router();
resources = require('./../resources/model');
var request = require('request');
var model = resources.pi.actuators;

router.route('/').get(function (req, res, next){
    req.result = resources.pi.actuators;
    next();
});

router.route('/lights').get(function (req, res, next){
  req.result = resources.pi.actuators.lights
  next();
});


router.route('/lights/:id').get(function (req, res, next){
  req.result = resources.pi.actuators.lights[req.params.id];
  next();
});

router.route('/lights/:id/state').get(function (req, res, next){
  req.result = resources.pi.actuators.lights[req.params.id].state;
  next();
}).put(function (req, res, next){
  var myLed = model.lights[req.params.id].state;
  myLed.on = req.body.on;
  console.info('changing light state on/off');
  req.result = myLed.on;
  next();
});

module.exports = router;
