var express = require('express');
var router = express.Router();

router.post('/',function(req,res){
    var request = req.body.command;
    var base64string = request.replace('base64 ',' ');
    var buf = Buffer.from(base64string,'ascii');
    var b64 = buf.toString('base64');
    res.send(b64);
})

module.exports = router;