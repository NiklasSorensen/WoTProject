var resources = require('./../resources/model'),
    converter = require('@q42philips/hue-color-converter');

exports.addDevice = function(id, name, description, sensors, actuators) {
  if(!resources.things) {
    resources.things = {};
  }
  resources.things[id] = {'name' : name,
    'description' : description,
    'sensors' : sensors,
    'actuators' : actuators
  }
};

exports.randomInt = function(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
};



exports.rgbToXy = function (hex){
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
  rVal = hexToRgb(hex).r;
  gVal = hexToRgb(hex).g;
  bVal = hexToRgb(hex).b;

  xY = converter.calculateXY(rVal,gVal,bVal);
  return xY;
};