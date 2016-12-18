// http://nodejs.org/api.html#_child_processes

var exec = require('child_process').exec;
var child;
// executes `pwd`
/**
child = exec("pwd", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
// or more concisely

function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("ls -la ../", puts);

*/
exports.startCommand = function(req, res) {
	
	child = exec("python ../command.py --name node1 --execute TwitterEsModa ", function (error,stdout,stderr){
		console.log("Start")
		 

	});

	res.sendStatus(200)


};

exports.deleteCommand = function(req, res) {

	child = exec("python ../command.py --name node1 --stop ", function (error, stdout, stderr) {
	  	console.log("stop")
	});
	console.log("sasas")
	res.sendStatus(200)


};
