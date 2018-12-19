const fs = require('fs');
const marked = require('marked');
const path = require('path');

var list = fs.readdirSync('article/');
var monthList = {'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun','07':'july','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'}

for(let i of list){
    let data = fs.readFileSync('article/'+i,'utf8');
    let head = fs.readFileSync('templet/art_head.html', 'utf8');
    let foot = fs.readFileSync('templet/art_foot.html', 'utf8');
    let title = i.split('-').slice(-1).toString().replace('.md', '');
    let dir = dirs(i);
    mkdirsSync('html/'+dir[3]);
    fs.writeFileSync('html/' + dir[3] + title + '.html', head.replace('x-z', title).replace(/aabbccdd/g,title).replace('99',dir[0]).replace('99',monthList[dir[1]]).replace('2099',dir[2]) + marked(data.toString()) + foot);
}
var articles = fs.readdirSync('article/');
var ArticleArray = [];
for(let i of articles){
    let dir = dirs(i);
    let ArticleTitle = '<li><span>'+i.slice(0,10)+'</span><a href="'+dir[3]+i.split('-').slice(-1).toString().replace('.md', '')+'.html " target="_blank">'+i.split('-').slice(-1).toString().replace('.md', '')+'</a></li>';
    ArticleArray.push(ArticleTitle);
}

var articlesList = ArticleArray.reverse().join('\n');

let head = fs.readFileSync('templet/head.html', 'utf8');
let foot = fs.readFileSync('templet/foot.html', 'utf8');

fs.writeFile('html/index.html',head+articlesList+foot,err =>{
    if(err) console.log(err);
})

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
function dirs(i){
    let dirArray = [];
    let day = i.slice(8,10);
    let month = i.slice(5,7);
    let year = i.slice(0,4);
    let dir = year+'/'+month+'/'+day+'/';
    dirArray.push(day,month,year,dir)
    return dirArray;
}