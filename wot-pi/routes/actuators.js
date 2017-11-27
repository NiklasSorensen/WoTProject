var express = require('express'),
    router = express.Router();
    resources = require('./../resources/model'),
    request = require('request'),
    model = resources.pi.actuators,
    utils = require('./../utils/utils.js');

router.route('/').get(function (req, res, next){
    req.result = model;
    next();
});

router.route('/lights').get(function (req, res, next){
  req.result = model.lights
  next();
});


router.route('/lights/:id').get(function (req, res, next){
  req.result = model.lights[req.params.id];
  next();
});

//#region Functions  
router.route('/lights/:id/functions').get(function(req, res, next){
  //TODO return med en liste af funktioner med endpoints
  req.result = model.lights[req.params.id].functions;
  next();
});

router.route('/lights/:id/functions/onoff').get(function (req, res, next){
  req.result = model.lights[req.params.id].state;
  next();
}).put(function (req, res, next){
  var myLed = model.lights[req.params.id].state;
  if(req.body.hex !== null){
    hex = req.body.hex;
    var color = utils.rgbToXy(hex);
    myLed.xy = color;
  }
  if(req.body.brightness !== null){
    bri = req.body.brightness;
    myLed.bri = bri;
  }
  myLed.on = req.body.on;
  console.info('changing light state on/off');
  //TODO fix cannot pull svar
  req.result = myLed.on;
  next();
});

router.route('/lights/:id/functions/changeColor').get(function(req, res, next){
  req.result = model.lights[req.params.id].functions.changeColor;
  next();
}).put(function(req, res, next){
  hex = req.body.hex;
  var color = utils.rgbToXy(hex);
  var xy = model.lights[req.params.id].state;

  xy.xy = color;

  req.result = xy.xy;
  next();
});

router.route('/lights/:id/functions/blink').get(function (req, res, next){
  req.result = model.lights[req.params.id].functions.blink;
  next();
}).put(function (req, res, next){
  console.info('blink is called');
  number = req.body.number;
  var myLed = model.lights[req.params.id].state;
  var wasOn = true;
  var previousBri = myLed.bri;
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
  setTimeout(function(){myLed.bri = previousBri}, 1000*number);
  req.result = myLed.on;
  next();
});

router.route('/lights/:id/functions/adjustBrightness').get(function(req, res, next){
  req.result = model.lights[req.params.id].functions.adjustBrightness;
  next();
}).put(function(req, res, next){
  var myLedBright = model.lights[req.params.id].state;
  
  myLedBright.bri = req.body.brightness;
  console.info('changing bri');
  res.send(myLedBright.on);
  
  //req.result = myLedBright.bri;
  //next();
});
//#endregion

module.exports = router;
