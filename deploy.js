
var spwan = require('child_process').spawn;
var express = require('express');
var app = express();

function run_cmd(cmd, args, callback){
    var child = spwan(cmd, args);
    var resp = "";

    child.stdout.on("data", (data)=>{resp += data.toString(); });
    child.stdout.on("end", ()=>{ callback(resp); });
    child.stderr.on("data", (data)=>{ 
        resp = resp + '\n' + data.toString(); 
        callback(resp);
    })
}

app.all('/', function(req, res){
    run_cmd("bash", ["deploy.sh"], function(resp){
        console.log(resp);
    });
    res.send('ok');
    console.log(req.body.read);
})

var server = app.listen(8001, "0.0.0.0", function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('auto-deploy项目自动更新服务：http://%s:%s', host, port)
})