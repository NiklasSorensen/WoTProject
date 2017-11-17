var resources = require('./../resources/model'),
    bluetoothPlugin = require('./../plugins/internal/bluetoothPlugin');

exports.newUser = function(mac){
    
    console.info('printing the mac variable fomr wot-server, before being pushed');
    console.info(mac);
    var data= resources.pi.sensors.bluetooth;
    for(i=0; i < mac.length; i++){
        data.users.push(mac);
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