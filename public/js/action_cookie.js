function Onclear(){
    terminal.clear()
}
function Beef(){
    window.open('http://beef.x-z.me')
}
function Actions(argument){
    $.post("/cli",{command: argument}).then(function(response){
            $("#mkdown").html(response);
            $("#mkdown1").modal();
    })
}
function change(themeColor){
    if( themeColor === 0){
        setCookie('themeColor',themeColor,100);
        themeColor++;
    }
    else if( themeColor === 1){
        $(".fullborad").css('background-color','white');
        $('.terminal').css({'background-color':'white','color':'black'});
        $(".cmd").css({'background-color':'white','color':'black'});
        $('.options').css('border-right', "1px solid black");
        $('.topbar').css("color",'black');
        $("html").css("background-color",'black');
        setCookie('themeColor',themeColor,100);
        themeColor++;
    }
    else if(themeColor === 2 ){
        $(".fullborad").css('background-color','black');
        $('.terminal').css({'background-color':'black','color':'white'});
        $(".cmd").css({'background-color':'black','color':'white'});
        $('.options').css('border-right', "1px solid white");
        $('.topbar').css("color",'white');
        setCookie('themeColor',themeColor,100);
        themeColor++;
    }
    else if(themeColor === 3){
        $(".fullborad").css('background-color','black');
        $('.terminal').css({'background-color':'black','color':'white'});
        $(".cmd").css({'background-color':'black','color':'white'});
        $('.options').css('border-right', "1px solid white");
        $('.topbar').css("color",'white');
        $("html").css("background-color",'white');
        setCookie('themeColor',themeColor,100);
        themeColor++;
    }
    else{
        $(".fullborad").css('background-color','white');
        $('.terminal').css({'background-color':'white','color':'black'});
        $(".cmd").css({'background-color':'white','color':'black'});
        $('.options').css('border-right', "1px solid black");
        $('.topbar').css("color",'black');
        setCookie('themeColor',themeColor,100);
        themeColor=1;
    }
}

function setCookie(cname, cvalue, exdays) {  
    var d = new Date();  
    d.setTime(d.getTime() + (exdays*24*60*60*1000));  
    var expires = "expires="+d.toUTCString();  
    document.cookie = cname + "=" + cvalue + "; " + expires; 
}
function getCookie(cname) {  
    if (document.cookie.length>0)
    { 
        c_start=document.cookie.indexOf(cname + "=")
        if (c_start!=-1)
        { 
            c_start=c_start + cname.length+1 
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            num = document.cookie.substring(c_start,c_end)
            return num;
        } 
    }
    return 0;
}  
function addCookie(){
    themeColor = Number(getCookie('themeColor'));
    if(themeColor == 4){
        change(1);
    }
    else{
        change(themeColor+1);
    }
}

function checkCookie()
{
    themeColor=getCookie('themeColor')
    themeColor = Number(themeColor);
    if (themeColor!=null && themeColor!=0)
        change(themeColor); 
    else 
        change(0);
}