var express=require('express')
var app=express();
app.get("/",function(request,response){
   //response.send("Welcome to Express js")
    // response.send("Welcome to Express js " +request.method);
   //response.send("Welcome to Express js " +request.originalUrl);
    response.send("Welcome to Express js " +request.path);
    
})
app.get("/hello",function(request,response){
    response.send("Welcome to my domain");
})
app.get("/hello/:name",function(request,response){
    response.send("Welcome to my home page " +request.params.name)
})
app.listen(3000);