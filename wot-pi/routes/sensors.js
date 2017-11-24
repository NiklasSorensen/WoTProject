var express = require('express'),
    router = express.Router(),
    resources = require('./../resources/model'),
    internalComms = require('./../communication/InternalCommunications.js');


router.route('/').get(function (req, res, next){
    req.result = resources.pi.sensors;
    next();
});


router.route('/bluetooth').get(function (req, res, next){
    req.result = resources.pi.sensors.bluetooth;
    next();
})

router.route('/bluetooth/users').get(function (req, res, next){
    req.result = resources.pi.sensors.bluetooth.users;
    next();
}).post(function(req,res,next){
    console.info('post request recieved');
    internalComms.newUser(req.body);
    console.info('post request done');
    req.result = req.body;
    next();
});

module.exports = router;