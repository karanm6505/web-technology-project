var express=require("express");
const app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
var MongoClient=require('mongodb').MongoClient;

app.get("/", function(req,res){
    res.send("Welcome to my Page");
})

var studentrouter=require("./student.js"); //http://localhost:3000/student
app.use("/student", studentrouter);
app.listen(3000,function(){
    console.log("Server Listening on 3000")
})
