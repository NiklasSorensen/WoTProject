var resources = require('./../resources/model'),
    bluetoothPlugin = require('./../plugins/internal/bluetoothPlugin');

exports.newUser = function(mac){
    
    console.info('printing the mac variable fomr wot-server, before being pushed');
    console.info(mac);
    var array = mac.macAddress
    var data= resources.pi.sensors.bluetooth;
    for(i=0; i < array.length; i++){
        data.users.push(array[i]);
        console.log(array[i]);
    }
      
    bluetoothPlugin.saveMacAndColorPref(data.users);
    
};


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