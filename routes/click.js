//处理导航部分的操作
var express = require('express');
var router = express.Router();
var fs = require('fs');
var marked = require('marked');

router.post('/',function(req,res){
    var request = req.body.command;
    var regArticleName = /[^\w]+/;
    if(!regArticleName.test(request)){
        fs.readFile('menu/'+request+'.md',function(err,data){
            if(err) 
                res.send("Article not found");
            else{
                var html = marked(data.toString());
                if(request === 'About')
                    res.render('layout',{title:request,mdown:html});
                else 
                    res.render('menu',{title:request,mdown:html});
            }
        })
    }
    else{
        res.send('Error Input');
    }
})

module.exports = router;