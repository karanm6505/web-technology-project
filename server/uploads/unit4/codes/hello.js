var express=require("express");
var router=express.Router();
router.get("/", function(req,res,next){
    res.send("First Function");
    next();
})
router.get("/", function(req,res){
    console.log("Second Function");
    
})
router.get("/:msg", function(req,res){
    res.send("Hi there, Greetings" +req.params.msg);
})
router.post("/", function(req,res){
    res.send("Hello Greeting Message saved");
})
router.put("/", function(req,res){
    res.send("Hello Greeting Message updated");
})
router.delete("/", function(req,res){
    res.send("Hello Greeting Message deleted");
})
module.exports=router;