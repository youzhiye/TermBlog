//处理文章模块
var express = require('express')
var router = express.Router()
var fs = require('fs')
var marked = require('marked')

router.post('/',function(req,res){
    var response = req.body.command;
    var reg = /^cat /;
    if(reg.test(response)){
        var resArtName = response.replace(/cat /,'');
        var regArticleName = /[\u4e00-\u9FA5|\w]+/;
        if(regArticleName.test(resArtName)){
            fs.readFile('posts/'+resArtName+'.md',function(err,data){
                if(err){
                    res.send("404");
                }
                else{
                    var html = marked(data.toString());
                    res.render('layout',{title:resArtName,mdown:html});
                }
            })
        }
        else{
            res.send("404");
        }
    }
})

module.exports = router;