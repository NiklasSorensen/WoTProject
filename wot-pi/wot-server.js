var httpServer = require('./servers/http'),
    resources = require('./resources/model'),
    actuators = require('./routes/actuators'),
    request = require('request'),
    converter = require('@q42philips/hue-color-converter');

var bluetoothPlugin = require('./plugins/internal/bluetoothPlugin.js');
var ourRequest = require('./communication/request.js');
var lights = require('./plugins/internal/lights.js');

var server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT Pi is up and running on port %s',
    resources.pi.port);
});



//Når det køres på PI, skal simulate være sat til false

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

colorLightXY = function(url,xy){
  console.log(url);
    request.put(
      url, {
        json: {
        "xy": xy
        }
      },
      function(error,response,body){
        if(!error && response.statusCode == 200){

        }
      }
    );
};

exports.newUser = function(mac){

  console.info('printing the mac variable fomr wot-server, before being pushed');
  console.info(mac);
  var data= resources.pi.sensors.bluetooth;
  data.users.push(mac);

  bluetoothPlugin.saveMacAndColorPref(data.users);

};

bluetoothPlugin.start({'simulate': false, 'frequency': 2000});
lights.start({'simulate': false, 'frequency': 2000});

ourRequest.getUsers();
//onOffLight('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/state',true);

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToXY(hex){
  rVal = hexToRgb(hex).r;
  gVal = hexToRgb(hex).g;
  bVal = hexToRgb(hex).b;

  xY = converter.calculateXY(rVal,gVal,bVal);
  return xY;
}
data = rgbToXY("#c4fff9");

console.info(data);
colorLightXY('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/state',data);
