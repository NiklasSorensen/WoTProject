var request = require('request');
    internalComms = require('./InternalCommunications.js');

exports.isHome = function(state, macAddress){
    console.log('sending state to server');
    request.put(
        'https://dd6da80a.ngrok.io/isUserHome', {
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
        'https://dd6da80a.ngrok.io/bluetoothdata', {
        },
        function(error,response,body){
            if(!error && response.statusCode == 200){
                var array = [];
                //console.log(response.body);
                console.log(typeof(response.body));
                //console.log(this.response.body[0]);
                var resp = JSON.parse(response.body);
                console.log(resp.macAddress[0]);
                console.log(typeof(resp));
                for(i=0; i < resp.macAddress.length; i++){
                    array.push(resp.macAddress[i]);
                }
                console.log(array);
                var obj = {
                    macAddress: array
                }
                internalComms.newUser(array);

            }
        }

    );
}
