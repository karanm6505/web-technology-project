var express=require("express");
var app= express();
app.get("/", function(req,res){
    res.send("Welcome to my Page");
})
var hellorouter=require("./hello.js"); //http://localhost:3000/hello
app.use("/hello", hellorouter);
/*var studentrouter=require("./student.js"); //http://localhost:3000/hello
app.use("/student", studentrouter);*/
app.listen(3000,function(){
    console.log("Server Listening on 3000")
})