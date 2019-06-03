
var spawn = require('child_process').spawn;
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

app.get('/', function(req, res){
    res.send('auto-deploy')
})

app.post('/', function(req, res){
    console.log(req);
    run_cmd("bash", ["./depoly.sh"], function(resp){
        console.log(resp);
    })
    res.send('ok');
})

var server = app.listen(8001, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('auto-deploy项目自动更新服务：http://%s:%s', host, port)
})