var express = require('express');
var md5 = require('md5');
var router = express.Router();

router.post('/',async function(req,res){
    res.set('Upgrade', 'h2,h2c')
    res.set('Content-Type', 'application/json');
    res.set('Connection', 'Upgrade, close');
    if(req.body.jsonrpc==='2.0'&&req.body.method&&req.body.params&&req.body.id){
        if(req.body.method == 'login'){
            var name = req.body.params[0];
            var Password = req.body.params[1];
            if(name === 'name' && Password === 'pass'){
                var token = md5(name+':'+Password);
                var result = {"jsonrpc":"2.0","result":token,"id":req.body.id,"error":null}
                res.send(result)
            }
            else{
                var result = {"jsonrpc":"2.0","result":null,"id":req.body.id,"error":{"code":200,"message":"Wrong Password","name":"JSONRPCError"}};
                res.send(result);
            }
        }
        else if(req.body.method == 'load'){
            if(req.body.params[0] == md5('name'+':'+'pass')){
                var module = req.body.params[1];
                try{
                var UserModule = require('../moudle/'+module);
                var run =await UserModule.hello();
                }
                catch(err){
                    var run = ('err');
                }
                if(typeof(run) === 'undefined') run = 'your code running with some problems.';
                var result = {"jsonrpc":"2.0","result":run,"id":req.body.id,"error":null}
                res.send(result);
            }
            else{
                result = {"jsonrpc":"2.0","result":null,"id":req.body.id,"error":{"code":200,"message":"Access Denied","name":"JSONRPCError"}}
                res.send(result)
            }
        }
        else if(req.body.method == 'system.describe'){
            var info = {"sdversion":"1.0","name":"DemoService","address":"http:\/\/192.168.48.135:3000\/jsonrpc","id":"urn:md5:9f870dbd4be8d02888018eeb9f94bfb3","procs":[{"name":"login","params":["user","passwd"],"help":"login to the server (return token)"},{"name":"load","params":["token","moudle"],"help":"load moudle"}]}
            res.send(info);
        }
        else{
            result = {"jsonrpc":"2.0","result":null,"id":req.body.id,"error":{"code":200,"message":"Access Denied","name":"JSONRPCError"}}
            res.send(result)
        }
    }

    else{
    var result = {"jsonrpc":"2.0","result":null,"id":req.body.id,"error":{"code":200,"message":"Access Denied","name":"JSONRPCError"}};
    res.send(result);
    }
})
module.exports = router;