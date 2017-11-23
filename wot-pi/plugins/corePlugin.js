var CorePlugin = exports.CorePlugin = function (params,
                                                model, 
                                                doStop, 
                                                doSimulate, 
                                                actionsIds,
                                                doAction) {
    if (params){
        this.params = params;
    } else {
        this.params = {'simulate': false, 'frequency': 5000};
    }

    this.doAction = doAction;
    this.doStop = doStop;
    this.doSimulate = doSimulate;
    this.actions = actionsIds;
    //this.model = utils.findProperty(propertyId);
    this.model = model;
};

CorePlugin.prototype.start = function() {
    if (this.actions) this.observeActions();
    if(this.params.simulate){
        this.simulate();
    } else {
        this.connectHardware();
    }
    console.info('[plugin started] %s', this.model.name);
}

CorePlugin.prototype.stop = function () {
    if (this.params.simulate) {
      clearInterval(this.interval);
    } else {
      if (this.doStop) this.doStop();
    }
    console.info('[plugin stopped] %s', this.model.name);
  };

CorePlugin.prototype.simulate = function () {
    var self = this;
    this.interval = setInterval(function () {
        self.doSimulate();
        self.showValue();
    }, self.params.frequency);
    console.info('[simulator started] %s', this.model.name);
};

CorePlugin.prototype.connectHardware = function () {
    throw new Error('connectedHardware() should be implemented by Plugin');
};

/*CorePlugin.prototype.showValue = function () {
    console.info('Current value for %s is %s', this.model.name, util.inspect(this.model.data[this.model.data.length-1]));
};*/

/*
CorePlugin.prototype.observeActions = function () {
    var self = this;
    _.forEach(self.actions, function (actionId) { //#F
      Object.observe(resources.links.actions.resources[actionId].data, function (changes) {
        var action = changes[0].object[changes[0].object.length -1];
        console.info('[plugin action detected] %s', actionId);
        if (self.doAction) self.doAction(action);
      }, ['add']);
    });
  };
*/
CorePlugin.prototype.createValue = function (data) {
    throw new Error('createValue(data) should be implemented by Plugin');
};
/*  
CorePlugin.prototype.addValue = function(data) {
    utils.cappedPush(this.model.data, this.createValue(data));
};*/