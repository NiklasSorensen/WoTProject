var resources = require('./../../resources/model');
var watchjs = require('watchjs');
var request = require('request');

var interval, sensor;
var model = resources.pi.actuators.lights;
var pluginName = resources.pi.actuators.lights.modelid;
var localParams = {'simulate': false, 'frequency': 2000};
var internalComms = require('./../../communication/InternalCommunications.js');

exports.start = function (params) {
    localParams = params;
    watchjs.watch(model[1].state, "on", function(){switchOnOff(model[1].state.on,10000);});
    if(localParams.simulate){
        simulate();
    }else{
        connectHardware();
    }
};

exports.stop = function(){
    if(localParams.simulate){
        clearInterval(interval);
    }else{
        sensor.unexport();
    }
    console.info('%s plugin stopped!', pluginName);
};


switchOnOff = function(state, colorVal) {
    url = 'http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/state';
    if(!localParams.simulate){
        console.log(url);
        request.put(
        url, {
            json: {
            "on": state,
            "hue": colorVal
            }
        },
        function(error,response,body){
            if(!error && response.statusCode == 200){
    
            }
        }
        );
    }
};


function connectHardware() {
    //har skal funktionaliteten være
    console.info('Hardware %s sensor started!', pluginName);
};

function simulate(){
    console.info('Hardware %s sensor started', pluginName);
};

function observe(what){
    watchjs.watch(what, function (changes){
        console.info('Change detected by plugin for %s...', pluginName);
        switchOnOff(model.state.on,10000);
    })
}
