var httpServer = require('./servers/http'),
    resources = require('./resources/model'),
    actuators = require('./routes/actuators');
var request = require('request');

var bluetoothPlugin = require('./plugins/internal/bluetoothPlugin');

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s',
    resources.pi.port);
});

onOffLight = function(url,state){
  console.log(url);
    request.put(
      url, {
        json: {
        "on": state
        }
      },
      function(error,response,body){
        if(!error && response.statusCode == 200){

        }
      }
    );
};


//onOffLight('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/state',true);

bluetoothPlugin.start({'simulate': true, 'frequency': 2000});

addUser = function(url, users){
  request.post(
    url, {
      json: {
        users
      }
    },
    function(error,response,body){
      if(!error && response.statusCode == 200){
        console.log("things happened");

      }
    }
  );
};

var newUser = '{"macAddress":"00000000"}';

addUser(resources.pi.sensors.bluetooth.users,newUser);