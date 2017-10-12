var request = require('request');
var config = require('./config');
var helper = require('./helper');
var cli = require('cli');
var readline = require('readline');
// variale to keep our token inside 
const authData = { token: ''};

// basic representation of current operation, this structure is processed
// using performOperation
var operationContext = {
	action: null, // integer in 1, 2, 3 ..
	id: null,
	isWaitingForId: false
}

//readline iterface, used to prompt  and parse user input
var rl = readline.createInterface(process.stdin, process.stdout);
rl.on('line', (l) => processInput(l, rl)).on('close',function() {
    process.exit(0);
});


authenticate();

// authenticate the current user
// stores token under authData.token
function authenticate() {
	cli.info("STARTING AUTH");
	const formPayload = {
		grant_type: 'password',
		username: config.credentials.dlEmail,
		password: config.credentials.dlPassword
	};
	request.post({
	  headers: {
	  	'content-type' : 'application/x-www-form-urlencoded',
	  	'Authorization': 'Basic ' + new Buffer(config.credentials.clientId + ":" + config.credentials.clientSecret).toString('base64')
	  },
	  url:     config.credentials.url,
	  body:    helper.urlEncodeJson(formPayload)
	}, function(error, response, body){
		authData.token = JSON.parse(body).access_token;
		showMenu();
	});
}

// Displays cli menu
function showMenu() {
	operationContext = {
		action: null,
		id: null,
		isWaitingForId: false
	};
	cli.ok("Active token -----> " + authData.token);
	cli.info("Report Operations \n 1. Report Create \n 2. Report Read \n 3. Report Update \n 4. Report Delete \n 5. Quit");
	//cli.withStdin(processInput);
	rl.setPrompt('Enter operation > ');
	rl.prompt();
}

// method to parse and store operations in following format 
// oeprationContext = {action : 2, id: 5, isWaitingForId: false}
// also checks if we can proceed to processing the operation
function processInput(data, rl) {

	if(parseInt(data) === 5 && !operationContext.isWaitingForId) {
		//quit the app
		rl.close();
	}
	var idOperations = [2, 3, 4];
	if(operationContext.isWaitingForId) {
		operationContext.id = parseInt(data);
		operationContext.isWaitingForId = false;
	} else {
		var actionId = parseInt(data);
		if(idOperations.indexOf(actionId) > -1) {
			//we need id too
			operationContext.isWaitingForId = true;
			operationContext.action = parseInt(data);
			//rl.clearLine(process.stdin, 0)
			rl.setPrompt('Enter id >');
			rl.prompt();
		} else {
			operationContext.isWaitingForId = false;
			operationContext.action = parseInt(data);
		}
	}
	if(operationContext.isWaitingForId == false) {
		performOperation();
	}
	
}

function performOperation() {
	var operationMap = {
		1: 'create',
		2: 'read',
		3: 'update',
		4: 'delete'
	};
	operation = operationMap[operationContext.action];
	var operationConfig = config.reportEndpoints[operation];
	var operationUrl = operationConfig.url;
	var baseRequest = request.defaults({
	  headers: {
	  	'Authorization': 'Bearer '+authData.token,
	  	"Content-Type": "application/json"
	  }
	});
	if(operationContext.id) {
		operationUrl = operationUrl.replace('[ID]', operationContext.id);
	};
	cli.info("Making "+operationConfig.method + " request on " + operationUrl);
	baseRequest[operationConfig.method.toLowerCase()]({url: operationUrl, body: operationConfig.payload, json: true}, (error, response, body) => {
		console.log('\x1b[36m%s\x1b[0m', "Request body ");
		console.log(body);
		cli.info("Request status " + response.statusCode + "(" + response.statusMessage + ")");
		showMenu();
	});
}