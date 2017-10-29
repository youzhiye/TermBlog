const express = require('express')
const marked = require("marked")
const ejs = require('ejs')
var fs = require('fs')
var os = require('os')
const app = express()
var bodyParser = require("body-parser")
app.use(express.static('public'))
app.set('views','./views')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/lala',function(req,res){
        if(req.body.command != ''){
                var response = req.body.command;
                var reg = /^cat /;
                if(response === 'help'){
                        res.send("Here're some tips which perhaps help you get to know the blog.\nYou can type the following commands:\nclear            清屏\nabout            关于\nartcile/ls       列出文章\nlinks            友链\ncat [article]    查看文章\nup/down          [上一条/下一条]输入")
                }
                else if(response === 'ls'|| response === 'article'){
                        var articleContents = '';
                        var ArticleNum = fs.readdirSync('./posts/').length;
                        var ArtNameArr = fs.readdirSync('./posts/');
                        ArtNameArr.forEach(function(item,index){
                                articleContents = articleContents + item.replace(/.md/,'')+'\n';
                        })
                        res.send('There are '+ArticleNum+' articles:\n'+ articleContents.slice(0,-1));
                }
                else if(response === 'links'){
                        res.send('Here are some links:\n放放酱[Gabriel]	 https://godeep.pro\n麻瓜恒[C1tas]	   http://blog.c1tas.com\n畅师傅[balis0ng]	http://balis0ng.com\nYan_1_20 [Yan]	 https://yan-1-20.github.io\n所长[lucifaer]	  http://lucifaer.com\n学霸[S_Dante]	   http://over-rainbow.cn\n廖妹[0xcc]	      http://blog.z0z.me\n老板[昂三年]	     http://l_ang.ren\n脆脆[a2ir]	      https://a2ir.github.io')
                }
                else if(reg.test(response)){
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
                else if(response === 'About'){
                        fs.readFile('menu/about.md',function(err,data){
                                if(err){
                                        res.send("404");
                                }
                                else{
                                        var html = marked(data.toString());
                                        res.render('layout',{title:'关于',mdown:html});
                                }
                        })
                }
                else if(response === 'Help'){
                        fs.readFile('menu/help.md',function(err,data){
                                if(err){
                                        res.send("404");
                                }
                                else{
                                        var html = marked(data.toString());
                                        res.render('menu',{title:'帮助',mdown:html});
                                }
                        })
                }
                else if(response === 'Links'){
                        fs.readFile('menu/links.md',function(err,data){
                                if(err){
                                        res.send("404");
                                }
                                else{
                                        var html = marked(data.toString());
                                        res.render('menu',{title:'友链',mdown:html});
                                }
                        })
                }
                else{
                        res.send('403');
                }
        }
        else{
                res.send("")
        }
})
app.get('/',function(req,res){
        res.sendFile(__dirname+"/"+"index.html")
})
app.get('/a/',function(req,res){
        res.render('3')
})
app.get('/4/',function(req,res){
        res.sendFile(__dirname+"/"+'404.html')
})
app.get('*',function(req,res){
        res.render('4')
})
app.listen(3000,function(){
        console.log("Running...")
})
