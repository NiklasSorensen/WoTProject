var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.actuators.lights;
var pluginName = resources.pi.actuators.lights.modelid;
var localParams = {'simulate': false, 'frequency': 2000};
var internalComms = require('./../../communication/InternalCommunications.js');

exports.start = function (params) {
    localParams = params;
    //observe(model);
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


function switchOnOff(state, colorVal) {
    if(!localParams.simulate){
        internalComms.onOffLight('http://192.168.0.108/api/zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA/lights/1/state', state, colorVal);
    }
};

function changeColor(value){
    if(!localParams.simulate){
        
    }
}

function connectHardware() {
    //har skal funktionaliteten være
    console.info('Hardware %s sensor started!', pluginName);
};

function simulate(){
    console.info('Hardware %s sensor started', pluginName);
};
