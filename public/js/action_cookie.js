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
        $(".right").css('background-color','black');
        $(".fullBorder").css('background-color','rgb(255, 255, 254)');
        $('.terminal').css({'background-color':'rgb(255, 255, 254)','color':'black'});
        $(".cmd").css({'background-color':'rgb(255, 255, 254)','color':'black'});
        $('.options').css('border-right', "1px solid black");
        $('.topBar').css("color",'black');
        setCookie('themeColor',themeColor,100);
        themeColor++;
    }
    else if(themeColor === 2 ){
        $(".right").css('background-color','black');
        $(".fullBorder").css('background-color','black');
        $('.terminal').css({'background-color':'black','color':'white'});
        $(".cmd").css({'background-color':'black','color':'white'});
        $('.options').css('border-right', "1px solid white");
        $('.topBar').css("color",'white');
        setCookie('themeColor',themeColor,100);
        themeColor++;
    }
    else if(themeColor === 3){
        $(".right").css('background-color','rgb(255, 255, 254)');
        $(".fullBorder").css('background-color','black');
        $('.terminal').css({'background-color':'black','color':'white'});
        $(".cmd").css({'background-color':'black','color':'white'});
        $('.options').css('border-right', "1px solid white");
        $('.topBar').css("color",'white');
        setCookie('themeColor',themeColor,100);
        themeColor++;
    }
    else{
        $(".right").css('background-color','rgb(255, 255, 254)');
        $(".fullBorder").css('background-color','rgb(255, 255, 254)');
        $('.terminal').css({'background-color':'rgb(255, 255, 254)','color':'black'});
        $(".cmd").css({'background-color':'rgb(255, 255, 254)','color':'black'});
        $('.options').css('border-right', "1px solid black");
        $('.topBar').css("color",'black');
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
$(function(){
    $('.clickright').hide();
    var w=screen.width;
    var h=screen.height;
    var left=$(".left");
    var right=$(".right");
     
    $('.clickleft').click(function(){
        left.animate({marginLeft:+w},1000);
        left.css("z-index","-5");
        right.css({"z-index":"-8","margin-left":"0"});
        $(this).hide();
        $('.clickright').show();
    });
     
    $('.clickright').click(function(){
        left.css({"z-index":"-10","margin-left":"0"});
        right.animate({marginLeft:-w},1000);
        $('.clickleft').show();
        $(this).hide();
    });
});