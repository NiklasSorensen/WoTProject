
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
  //TODO fix cannot pull svar
  req.result = myLed.on;
  next();
});


router.route('/lights/:id/functions').get(function(req, res, next){
  //TODO return med en liste af funktioner med endpoints
  req.result = resources.pi.actuators.lights[req.params.id].functions;
  next();
});

router.route('/lights/:id/functions/blink').get(function (req, res, next){
  req.result = resources.pi.actuators.lights[req.params.id].functions.blink;
  next();
}).put(function (req, res, next){
  number = req.body.number;
  var myLed = model.lights[req.params.id].state;
  var wasOn = true;
  if(myLed.on == false){
    myLed.on = true
    wasOn = false
  }
  var blink = function(){
    if(myLed.bri == 254){
      myLed.bri = 0
    } else {
      myLed.bri = 254
    }
  }
  for(i = 0; i < number; i++){
    setTimeout(blink,1000*i);
  }
  if(!wasOn){
    setTimeout(function(){myLed.on = false}, 1000*number);
  }
  req.result = myLed.on;
  next();
});

router.route('/lights/:id/functions/adjustBrightness').get(function(req, res, next){
  req.result = resources.pi.actuators.lights[req.params.id].functions.adjustBrightness;
  next();
}).put(function(req, res, next){
  var myLedBright = model.lights[req.params.id].state;
  
  myLedBright.bri = req.body.brightness;
  console.info('changing bri');
  res.send(myLedBright.on);
  
  //req.result = myLedBright.bri;
  //next();
});
module.exports = router;
