var resources = require('./../resources/model'),
    bluetoothPlugin = require('./../plugins/internal/bluetoothPlugin'),
    request = require('request');

exports.newUser = function(mac){
    
    console.info('printing the mac variable from request, before being pushed');
    console.info(mac);
    var array = mac.macAddress;
    var data= resources.pi.sensors.bluetooth;
    for(i=0; i < array.length; i++){
        data.users.push(array[i]);
        console.log(array[i]);
    }
      
    bluetoothPlugin.saveMacAndColorPref(data.users);
    
};