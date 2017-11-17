var express = require('express'),
    router = express.Router(),
    resources = require('./../resources/model'),
    internalComms = require('./../communication/InternalCommunications.js');


router.route('/').get(function (req, res, next){
    req.result = resources.pi.sensors;
    next();
});


router.route('/bluetooth').get(function (req, res, next){
    res.send(resources.pi.sensors.bluetooth);
})

router.route('/bluetooth/users').get(function (req, res, next){
    res.send(resources.pi.sensors.bluetooth.users);
}).post(function(req,res,next){
    fs.writeFileSync();
    internalComms.newUser(req.body);
    console.info('post request done');
    res.send(req.body);
});

module.exports = router;