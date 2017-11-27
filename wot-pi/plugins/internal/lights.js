var resources = require('./../../resources/model');
var watchjs = require('watchjs');
var request = require('request');

var interval, sensor;
var model = resources.pi.actuators.lights;
var pluginName = resources.pi.actuators.lights.modelid;
var localParams = {'simulate': false, 'frequency': 2000};
var internalComms = require('./../../communication/InternalCommunications.js');

var url = 'http://192.168.0.100/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/state'

exports.start = function (params) {
    localParams = params;
    watchjs.watch(model[1].state, ["on","xy"], function(){switchOnOff(model[1].state.on,model[1].state.xy);});
    watchjs.watch(model[1].state, "bri", function(){adjustBrightness(model[1].state.bri);});
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


switchOnOff = function(state, xy) {
    if(!localParams.simulate){
        console.log(url);
        request.put(
        url, {
            json: {
            "on": state,
            "xy": xy
            }
        },
        function(error,response,body){
            if(!error && response.statusCode == 200){
    
            }
        }
        );
    }
};

adjustBrightness = function(bri){
    console.info('calling method adjustBrightness - observer works');
    if(!localParams.simulate){
        request.put(
            url,{
                json: {
                    "bri": bri
                }
            },
            function(error, response,body){
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

