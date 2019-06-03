
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

function update_reposity(){
    return new Promise(function(resolve, reject){
        run_cmd("git", ["pull"], function(resp){
            resolve(resp);
        })
    })
}

function restart_server(){
    return new Promise(function(resolve, reject){
        run_cmd("pm2", ["restart", "auto-deploy"], function(resp){
            resolve(resp);
        })
    })
} 

app.get('/hello', function(req, res){
    res.send("hello")
})

app.all('/', async function(req, res){
    var resp = "";
    if(req.body){
        resp = req.body.read;
    }

    resp = resp + '\r\n' + await update_reposity();
    console.log(resp);
    res.send(resp); // return to github, will show in "Recent Deliveries"

    resp = await restart_server();
    console.log(resp);
})

var server = app.listen(8001, "0.0.0.0", function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('auto-deploy项目自动更新服务：http://%s:%s', host, port)
})