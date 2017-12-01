var resources = require('./../../resources/model'),
	interval, sensor,
 	model = resources.pi.sensors.bluetooth,
 	pluginName = resources.pi.sensors.bluetooth.name,
	localParams = {'simulate': false, 'frequency': 2000},
	communication = require('./../../communication/request.js');


var timeToWaitBeforeFalse = 30;

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


var userArray = [];



//Gem en brugerliste, med macAddress
exports.saveMacAddress = function(userList){
  userArray=[];
//hent userlist fra resource fil
  for(i=0;i<userList.length;i++){
    var macAddress= userList[i];
    var timeNotConnected = 0;
    var timeConnected = 0;
    var isNearby = false;
    newArray = [macAddress, 10000, timeConnected, timeNotConnected, isNearby];  //array[macAddress, color, TimeConnected, timeNotConnected, isNearby?]
    userArray.push(newArray);
  }

  console.info(userArray);

}
function connectHardware() {
    var noble = require('noble');

	console.log('bluetooth plugin runs');

	noble.on('stateChange', function(state) {
		if (state === 'poweredOn'){
			noble.startScanning([], true);
		}else{
			noble.stopScanning();
		}
	});

	//2C:33:61:B1:CF:48

	//FD:B2:B6:12:22:FE  forerunner

	//F2:26:04:14:4C:66 VivoActive

	//zwxLWe5QUN6m3R0F92GoSOdT6rvq0cPw6THRxfJA


	noble.on('discover', function(peripheral) {

		var macAddress = peripheral.uuid;
		var rss = peripheral.rssi;

		
		for(i=0; i<userArray.length; i++){
			if(macAddress == userArray[i][0]){		//Kontroller at den fundne macAddress er i vores user List
		
				
				if(userArray[i][4] == false){		//Er isNearby false?
					console.log('found device: ', macAddress, ' ', ' ', rss);
					userArray[i][4] = true;			//Set isNearby til true.
					console.log('just before sending communication');
					communication.isHome(userArray[i][4], userArray[i][0]);
				}
				userArray[i][3] = 0;				//Set not timeNotConnected til 0 "reset, da man nu har hørt fra dem"
			}else if(userArray[i][3] >= timeToWaitBeforeFalse){		//Er det over 30 sekunder siden vi har hørt fra denne enhed?
				if(userArray[i][4] == true){		//Er isNearby lig med true?
					userArray[i][4] = false			//Set isNearby til false
					//TODO skriv til serveren at enheden ikke er tilstede mere
					communication.isHome(userArray[i][4], userArray[i][0]);
				}
			}
		}
		
		/*console.log(userArray[0][0] + '     ' + userArray[0][1] + '     ' + userArray[0][2] + '      ' + userArray[0][3]);
		console.log(userArray[1][0] + '     ' + userArray[1][1] + '     ' + userArray[1][2] + '      ' + userArray[1][3]);
		console.log(userArray[2][0] + '     ' + userArray[2][1]+ '      ' + userArray[2][2] + '      ' + userArray[2][3]);*/
	});

	function intervalSetAddToTimer(){
		//console.log('has been not been heard from index for: ' + timer + ' seconds');
		for(i=0; i<userArray.length; i++){
			if(userArray[i][4] == false){
				userArray[i][2] = 0;
			} else if(userArray[i][4] == true){
				userArray[i][2] = userArray[i][2] + 1;
			}
			userArray[i][3] = userArray[i][3] + 1;
		}
		
		
	}

	setInterval(intervalSetAddToTimer, 1000);


    console.info('Hardware %s sensor started!', pluginName);
};

function simulate() {
    interval = setInterval(function () {

    }, localParams.frequency);
    console.info('Simulated %s sensor started!', pluginName);
};
