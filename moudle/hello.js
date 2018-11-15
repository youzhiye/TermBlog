exports.hello = function() {
    return await new Promise((res,rej)=>{
        res('Hello World');
    })
}