var express = require('express'),
    router = express.Router();
    resources = require('./../resources/model'),
    wotServer = require('./../wot-server');

router.route('/').get(function (req, res, next){
    req.result = resources.pi.sensors;
    next();
});

router.route('/bluetooth/users').get(function (req, res, next){

    res.send(resources.pi.sensors.bluetooth.users);

}).post(function(req,res,next){

   var macUser = resources.pi.sensors.bluetooth;
   macUser.users= req.body.macAddress;
   wotServer.test(macUser.users);



   console.info('post request done');
      res.send(macUser.users);
  });

  router.route('/bluetooth/').get(function (req, res, next){

      res.send(resources.pi.sensors.bluetooth);

  })

module.exports = router;
