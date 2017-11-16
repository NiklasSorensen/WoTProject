var express = require('express'),
    router = express.Router();
    resources = require('./../resources/model');

router.route('/').get(function (req, res, next){
    req.result = resources.pi.sensors;
    next();
});

router.route('/bluetooth').get(function (req, res, next){

    res.send(resources.pi.sensors.bluetooth);

}).put(function(req,res,next){

   var macUser = resources.pi.sensors.bluetooth;
   macUser.users= req.body.users;


   console.info('put request done');
      res.send(macUser.users);
  });

router.route('/bluetooth/users').get(function (req, res, next){
    res.send(resources.pi.sensors.bluetooth.users);
})

module.exports = router;
