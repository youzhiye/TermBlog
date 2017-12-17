var fs = require('fs');
var marked = require('marked');

function dirLs(path,callback){
    var ArticleNums = fs.readdirSync(path).length;
    var dirNameArr = fs.readdirSync(path);
    var articleTitle = '';

    dirNameArr.forEach(function(item,index){
        articleTitle = articleTitle + item.replace(/.md/,'')+'\n';
    })
    callback(ArticleNums,articleTitle.slice(0,-1));
}
function fileCat(path,articleName,callback){
    if(!/[^\u4e00-\u9FA5|\w]+/.test(articleName)){
        fs.readFile(path+articleName+'.md',function(err,data){
            if(err) callback(1);
            else{var html = marked(data.toString());callback(null,articleName,html);}
        });
    }
    else{
        callback(2);
    }
}
exports.dirLs = dirLs;
exports.fileCat = fileCat;