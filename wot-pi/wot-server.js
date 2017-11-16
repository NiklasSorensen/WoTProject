var httpServer = require('./servers/http'),
    resources = require('./resources/model'),
    actuators = require('./routes/actuators');
var request = require('request');


var bluetoothPlugin = require('./plugins/internal/bluetoothPlugin');

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s',
    resources.pi.port);
});



//console.log(data);
bluetoothPlugin.start({'simulate': true, 'frequency': 2000});

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

var test = function(mac){

  var data= resources.pi.sensors.bluetooth;
  data.users.push(mac);
  console.info(data.users[0]);

  bluetoothPlugin.saveMacAndColorPref(data.users);


}



newUser = function(mac){
//saveMacAndColorPref(mac);
var data= resources.pi.sensors.bluetooth.users;
console.info(data);
  request.post(
    'http://localhost:8484/pi/sensors/bluetooth/', {
      json: {
        "users": data.users.push(mac)

      }
    },
    function(error,response,body){
      if(!error && response.statusCode == 200){
        console.info("new user added");
      }
    }
  );

};
//onOffLight('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/state',true);

var user = {
  "mac":124213
};
var user2 = {
  "mac":1224213
};
 // test(user);
 // test(user2);

module.exports = test;
