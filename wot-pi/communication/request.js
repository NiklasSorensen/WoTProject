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
        function(error,responce,body){
            if(!error && response.statusCode == 200){
                console.log(response.body);
                internalComms.newUser(response.body);

            }
        }

    );
}
