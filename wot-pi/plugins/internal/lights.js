var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.actuators.lights;
var pluginName = resources.pi.actuators.lights.modelid;
var localParams = {'simulate': false, 'frequency': 2000};

exports.start = function (params) {
    localParams = params;
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

function connectHardware() {
    //har skal funktionaliteten være
    console.info('Hardware %s sensor started!', pluginName);
};

function simulate(){
    console.info('Hardware %s sensor started', pluginName);
};