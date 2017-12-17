//导入必要的模块
const express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const fs = require('fs');
const os = require('os');

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
    res.sendFile(__dirname+"/"+"index.html")
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
    console.log("Running...");
});