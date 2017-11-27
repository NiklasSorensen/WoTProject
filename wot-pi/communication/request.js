var request = require('request');
    internalComms = require('./InternalCommunications.js');
    url = 'https://e1b20ff1.ngrok.io';    

exports.isHome = function(state, macAddress){
    console.log('sending state to server');
    request.put(
        url+'/isUserHome', {
          json: {
          state: state,
          user: macAddress
          }
        },
        function(error,response,body){
          if(!error && response.statusCode == 200){
    
          }
        }
      );
};

exports.getUsers = function(){
    console.log('getting users');
    request.get(
        url+'/bluetoothdata', {
        },
        function(error,response,body){
            if(!error && response.statusCode == 200){
                var array = [];
                //console.log(this.response.body[0]);
                var resp = JSON.parse(response.body);
                for(i=0; i < resp.macAddress.length; i++){
                    array.push(resp.macAddress[i]);
                }
                var obj = {
                    macAddress: array
                }
                internalComms.newUser(obj);

            }
        }

    );
}
