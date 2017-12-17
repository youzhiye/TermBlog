//处理常规的操作
var express = require('express');
var router = express.Router();
var options = require('../moudle/functions');

router.post('/',function(req,res){
    var request = req.body.command;
    var dictTips = {
        'help':"Here're some tips which perhaps help you get to know the blog.\nYou can type the following commands:\nclear            清屏\nabout            关于\nartcile/ls       列出文章\nlinks            友链\ncat (article)    查看文章\nup/down          上一条/下一条输入",
        'links':'Here are some links:\n放放酱(Gabriel)	 https://godeep.pro\n麻瓜恒(C1tas)	   http://blog.c1tas.com\n畅师傅(balis0ng)	http://balis0ng.com\nYan_1_20 (Yan)	 https://yan-1-20.github.io\n所长(lucifaer)	  http://lucifaer.com\n学霸(S_Dante)	   http://over-rainbow.cn\n廖妹(0xcc)	      http://blog.z0z.me\n老板(昂三年)	     http://l_ang.ren\n脆脆(a2ir)	      https://a2ir.github.io',
        'about':"选择恐惧症患者，具有懒癌和死宅属性。\ngithub： http://github.com/youzhiye\nweibo ： http://weibo.com/u/5813130944\nmail  ： you_zhiye@163.com"
    }
    if(request === 'ls' || request === 'article'){
        options.dirLs('posts/',function(articleNums,articleTitle){
            res.send("Here're "+articleNums+' reports:\n'+ articleTitle);
        })
    }
    else if(/sb/.test(request)||/mmp/.test(request)||/fuck/.test(request)||/nima/.test(request)){
        var say = ["mmp","What's the fuck?","喂,110么,这有一XX","你说啥？"]
        var num = Math.random()*3;
        num = Math.round(num);
        res.send('55885400'+say[num]);
    }
    else if(typeof(dictTips[request]) != 'undefined'){
        res.send(dictTips[request]);
    }
    else if(request === 'cat' || request === "func"){
        res.send('To many arguments');
    }
    else{
        res.send('Error Input');
    }
})

module.exports = router;