var request = require('request');

exports.isHome = function(state, macAddress){
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
