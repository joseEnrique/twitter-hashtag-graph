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
	name = req.body.name
	hashtag = req.body.hashtags
	stringcommand = "python ../command.py --name "+ name +" --execute "+hashtag
	console.log(stringcommand)
	child = exec(stringcommand, function (error,stdout,stderr){
		console.log(stderr)
		 

	});

	
	res.redirect(200,'/list');


};

exports.deleteCommand = function(req, res) {

	child = exec("python ../command.py --name "+req.params.name+" --stop ", function (error, stdout, stderr) {
	  	console.log("stop")
	});
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.redirect(200,'/list');


};




