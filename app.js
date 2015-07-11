#!/usr/bin/env node

var fs = require('fs');
var path = require("path");
var program = require('commander');
var JSONPackage = require('./package.json');


function copy(from, to, fn) {
	if (typeof fn == "function") {
		fs.writeFile(to, fs.readFileSync(from),fn);
	} else {
		fs.writeFileSync(to, fs.readFileSync(from));
	}
}

var numJobsToComplete = 7;
function checkFinalJob() {
	numJobsToComplete--;
	if (numJobsToComplete == 0) {
		console.log("Your Pillars project has been created successfully");
		console.log("Install dependencies with: cd %s && npm install", appName);
		console.log("Start your project with: npm start");
	}
}

var templatePath = __dirname + "/files/";

program
	.version(JSONPackage.version)
	.usage('[options] dir')
	//.option('-p , --pp', 'opción p')
	.on('--help', function () {
		/*Para ejemplos de utilizacion
		* o documentación personalizada
		console.log('  Examples:');
		console.log('');
		console.log('    $ custom-help --help');
		console.log('    $ custom-help -h');
		console.log('');*/
	})
	.parse(process.argv);
	
//if there is something wrong in params at call time
if (program.args.length > 1) {
	//this call shows help and exit
	program.help();
}

// Path
var destinationPath = program.args.shift() || '.';

// App name
var appName = path.basename(path.resolve(destinationPath));

//continue with project creation


if (fs.existsSync(destinationPath)) {
	//we need to check if directory is empty
	var files = fs.readdirSync(destinationPath);
	if (files.length !== 0) {
		console.error("Directory is not empty");
		process.exit(-1);		
	} else {
		createProjectTree(false);
	}
} else {
	createProjectTree(true);
}

function createProjectTree(createRoot) {
	if (createRoot) {
		fs.mkdirSync(destinationPath);
	}
	fs.mkdir(destinationPath + "/controllers", function (error) {
		copy(templatePath + "js/indexController.js"
			, destinationPath + "/controllers/indexController.js",function(error) {
				if (!error) {
					checkFinalJob();
				}
			});
	});
	fs.mkdir(destinationPath + "/routes", function (error) {
		copy(templatePath + "js/routes.js"
			, destinationPath + "/routes/routes.js",function(error) {
				if (!error) {
					checkFinalJob();
				}
			});
	});
	fs.mkdir(destinationPath + "/views", function (error) {
		copy(templatePath+"jade/index.jade", destinationPath + "/views/index.jade");	
	});
	fs.mkdir(destinationPath + "/www", function (error) {
		fs.mkdir(destinationPath + "/www/syles", function (error) {
			if (!error) {
				checkFinalJob();
			}
		});
		fs.mkdir(destinationPath + "/www/img", function (error) {
			if (!error) {
				checkFinalJob();
			}
		});
		fs.mkdir(destinationPath + "/www/js", function (error) {
			if (!error) {
				checkFinalJob();
			}
		});
	});	
	var pkg = require(templatePath + "package.json");
	pkg.name = appName;
	fs.writeFile(destinationPath + "/package.json", JSON.stringify(pkg), function (error) {
		if (!error) {
			checkFinalJob();
		}
	});
	
	copy(templatePath + "js/www.js", destinationPath + "/www.js", function (error) {
		if (!error) {
			checkFinalJob();
		}
	});
}