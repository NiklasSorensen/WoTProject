var express = require('express'),
    router = express.Router();
    resources = require('./../resources/model'),
    wotServer = require('./../wot-server');

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

   //var macUser = resources.pi.sensors.bluetooth;

wotServer.test(req.body);

  console.info(req.body);



   console.info('post request done');
      res.send(req.body);
  });

  router.route('/bluetooth/').get(function (req, res, next){

      res.send(resources.pi.sensors.bluetooth);

  })


module.exports = router;
//
