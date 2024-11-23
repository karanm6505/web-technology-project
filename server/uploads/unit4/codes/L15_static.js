var express =require('express');
var path=require('path');
var app=express();
app.use(express.static('public'));
app.use(express.static('Images'));
app.listen(3000,function(){
 console.log("Server is listening on 3000");
})