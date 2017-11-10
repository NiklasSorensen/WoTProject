var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.sensors.bluetooth;
var pluginName = resources.pi.sensors.bluetooth.name;
var localParams = {'simulate': false, 'frequency': 2000};

exports.start = function (params) {
    localParams = params;
    if(localParams.simulate){
        simulate();
    }else{
        connectHardware();
    }
};

exports.stop = function (){
    if(localParams.simulate){
        clearInterval(interval);
    }else{
        sensor.unexport();
    }
    console.info('%s plugin stopped!', pluginName);
};

function connectHardware() {
    //har skal funktionaliteten for bluetooth ligge, såvidt jeg har forstået

    console.info('Hardware %s sensor started!', pluginName);
};

function simulate() {
    interval = setInterval(function () {
        model.users = !model.users;
        showUsers();
    }, localParams.frequency);
    console.info('Simulated %s sensor started!', pluginName);
};

function showUsers(){
    console.info(model.users ? 'there is someone!' : "not anymore!");
};
