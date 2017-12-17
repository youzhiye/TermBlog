//处理文章模块
var express = require('express');
var router = express.Router();
var fileCat = require('../moudle/functions');

router.post('/',function(req,res){
    var request = req.body.command;
    if(/^cat /.test(request)){
        fileCat.fileCat('posts/',request.replace(/ +/g,' ').split(' ')[1],function(err,title,html){
            if(err) {console.log(err);res.send("Article not found");}
            else res.render('layout',{title:title,mdown:html});
        })
    }
    else{
        res.send("Error Input");
    }
});

module.exports = router;