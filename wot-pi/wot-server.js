var httpServer = require('./servers/http'),
    resources = require('./resources/model'),
    actuators = require('./routes/actuators'),
    request = require('request'),
    bluetoothPlugin = require('./plugins/internal/bluetoothPlugin.js'),
    ourRequest = require('./communication/request.js'),
    lights = require('./plugins/internal/lights.js');

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s',
    resources.pi.port);
});

exports.newUser = function(mac){

  console.info('printing the mac variable fomr wot-server, before being pushed');
  console.info(mac);
  var data= resources.pi.sensors.bluetooth;
  data.users.push(mac);

  bluetoothPlugin.saveMacAndColorPref(data.users);

};

bluetoothPlugin.start({'simulate': true, 'frequency': 2000});
lights.start({'simulate': false, 'frequency': 2000});

ourRequest.getUsers();
//onOffLight('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/state',true);

