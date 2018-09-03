//导入必要的模块
const express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const fs = require('fs');
const os = require('os');
const marked = require('marked');

//导入路由文件
var article = require('./routes/article');
var options = require('./routes/options');
var click = require('./routes/click');
//var moudle = require('./routes/moudle');

const app = express();

//设置模板引擎
app.disable('x-powered-by');
app.set('views','./views');
app.set('view engine','ejs');

//使用静态文件及路由
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/article',article);
//app.use('/moudle',moudle)
app.use('/options',options);
app.use('/cli',click);

//首页
app.get('/',function(req,res){
    list = fs.readdirSync('posts/');
    var listMap = new Map();
    for(let i of list){
        listMap.set(i.replace('.md',''),fs.statSync('posts/'+i).atime.toLocaleDateString());
    }
    res.render('index',{list: listMap});
});

//404
app.get(/a/,function(req,res){
    res.render('404_1');
});

//404
app.get('*',function(req,res){
    res.render('404_2');
});

//监听运行端口
app.listen(3000,function(){
    list = fs.readdirSync('posts/');
    for(let i of list){
        fs.readFile('posts/'+i,function(err,data){
            if(err) console.log(err)
            else {
                head = fs.readFileSync('views/head.ejs','utf8');
                foot = fs.readFileSync('views/foot.ejs','utf8');
                title = i.replace('.md','');
                fs.writeFile('public/posts/'+title+'.html',head.replace('x-z',title)+marked(data.toString())+foot,(err)=>{if(err) console.log(err)})
            }
        })
    }
    console.log("Running...");
});