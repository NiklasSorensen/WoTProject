var express = require('express'),
router = express.Router();
resources = require('./../resources/model');

router.route('/').get(function (req, res, next){
    res.send(resources.pi.actuators);
});

router.route('/lights').get(function (req, res, next){
    res.send(resources.pi.actuators.lights);
});

router.route('/lights/:id').get(function (req, res, next){
    res.send(resources.pi.actuators.lights[req.params.id]);
});

module.exports = router;