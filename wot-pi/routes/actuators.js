var express = require('express'),
router = express.Router();
resources = require('./../resources/model');

router.route('/').get(function (req, res, next){
    req.result = resources.pi.actuators;
    next();
});

router.route('/lights').get(function (req, res, next){
    req.result = resources.pi.actuators.lights;
    next();
});

router.route('/lights/:id').get(function (req, res, next){
    req.result = resources.pi.actuators.lights[req.params.id];
    next();
}).put(function (req, res, next){
    var selectedLed = resources.pi.actuators.lights[req.params.id];
    selectedLed.value = req.body.value;
    console.info('Changed LED %s value to %s', req.params.id, selectedLed.value);
    req.result = selectedLed;
    next();
});

module.exports = router;