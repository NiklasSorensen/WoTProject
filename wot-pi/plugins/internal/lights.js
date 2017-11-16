var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.actuators.lights;
var pluginName = resources.pi.actuators.lights.modelid;
var localParams = {'simulate': false, 'frequency': 2000};

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
/*
function observe(what){
    Object.observe(what, function (changes){
        console.info('Change detected by plugin for %s...', pluginName);

        //Listening on model, for changes, then calls switch on off
        switchOnOff(model.value);
    });
}; */

function switchOnOff(value) {
    if(!localParams.simulate){

        /*  // Her laver den
        actuator.write(value === true ? 1 : 0, function (){
            console.info('Changed value of %s to %s', pluginName, value);
        });*/
    }
};

function connectHardware() {
    //har skal funktionaliteten være
    console.info('Hardware %s sensor started!', pluginName);
};

function simulate(){
    console.info('Hardware %s sensor started', pluginName);
};
