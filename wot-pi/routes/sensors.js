var express = require('express'),
    router = express.Router();
    resources = require('./../resources/model');

router.route('/').get(function (req, res, next){
    req.result = resources.pi.sensors;
    next();
});

router.route('/bluetooth').get(function (req, res, next){
    res.send(resources.pi.sensors.bluetooth);
})

module.exports = router;
