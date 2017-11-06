function Onclear(){
    terminal.clear()
}
function Actions(argument){
    $.post("/cli",{command: argument}).then(function(response){
            $("#mkdown").html(response);
            $("#mkdown1").modal();
    })
}
function change(i1){
    if( i1 === 0){
        setCookie('i1',i1,100);
        i++;
    }
    else if( i1 === 1){
        $(".fullborad").css('background-color','white');
        $('.terminal').css({'background-color':'white','color':'black'});
        $(".cmd").css({'background-color':'white','color':'black'});
        $('.options').css('border-right', "1px solid black");
        $('.topbar').css("color",'black');
        $("html").css("background-color",'black');
        setCookie('i1',i1,100);
        i1++;
    }
    else if(i1 === 2 ){
        $(".fullborad").css('background-color','black');
        $('.terminal').css({'background-color':'black','color':'white'});
        $(".cmd").css({'background-color':'black','color':'white'});
        $('.options').css('border-right', "1px solid white");
        $('.topbar').css("color",'white');
        setCookie('i1',i1,100);
        i1++;
    }
    else if(i1 === 3){
        $(".fullborad").css('background-color','black');
        $('.terminal').css({'background-color':'black','color':'white'});
        $(".cmd").css({'background-color':'black','color':'white'});
        $('.options').css('border-right', "1px solid white");
        $('.topbar').css("color",'white');
        $("html").css("background-color",'white');
        setCookie('i1',i1,100);
        i1++;
    }
    else{
        $(".fullborad").css('background-color','white');
        $('.terminal').css({'background-color':'white','color':'black'});
        $(".cmd").css({'background-color':'white','color':'black'});
        $('.options').css('border-right', "1px solid black");
        $('.topbar').css("color",'black');
        setCookie('i1',i1,100);
        i1=1;
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
    i1 = Number(getCookie('i1'));
    if(i1 == 4){
        change(1)
    }
    else{
        change(i1+1);
    }
}

function checkCookie()
{
    i1=getCookie('i1')
    i1 = Number(i1);
    if (i1!=null && i1!=0)
        change(i1) 
    else 
        change(0)
}