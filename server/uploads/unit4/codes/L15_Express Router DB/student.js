var express=require("express");
const app=express();
const  MongoClient  = require("mongodb").MongoClient;
var router=express.Router();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
const url = "mongodb://127.0.0.1:27017";
// GET endpoint to retrieve employees based on query parameters
router.get("/", (req, res) => {
   MongoClient.connect(url)
    .then((connectedClient)=>
    {
        client=connectedClient
    })
    .then(()=>
    {
       let result
       const collection=client.db("university").collection("student")
       return collection.find(req.query).toArray(result)
    })
    .then((result)=>{
        console.log((result));
        res.send(result);
            
    })
    .catch((err)=>{
        console.log(err)
    
    })
})
router.get("/:id", (req, res) => {
    MongoClient.connect(url)
     .then((connectedClient)=>
     {
         client=connectedClient
     })
     .then(()=>
     {
        let result
        const collection=client.db("university").collection("student")
        console.log("SRN",+req.params.id)
        return collection.findOne({srn:req.params.id});
     })
     .then((result)=>{
         console.log((result));
         res.send(result);
             
     })
     .catch((err)=>{
         console.log(err)
     
     })
 })
router.post("/", (req, res) => {
  
    MongoClient.connect(url)
     .then((connectedClient)=>
     {
         client=connectedClient
     })
     .then(()=>
     {
        let result
        const collection=client.db("university").collection("student");
        console.log(req.body);
        return collection.insertOne(req.body);
     })
     .then((result)=>{
         console.log((result));
         res.send(result);
             
     })
     .catch((err)=>{
         console.log(err)
     
     })
 })
  
 router.put("/:sid", (req, res) => {
  
    MongoClient.connect(url)
     .then((connectedClient)=>
     {
         client=connectedClient
     })
     .then(()=>
     {
        let result
        const collection=client.db("university").collection("student");
        console.log(req.body);
        return collection.updateOne({srn:req.params.sid},req.body);
     })
     .then((result)=>{
         console.log((result));
         res.send(result);
             
     })
     .catch((err)=>{
         console.log(err)
     
     })
 })
 
 router.delete("/:sid", (req, res) => {
  
    MongoClient.connect(url)
     .then((connectedClient)=>
     {
         client=connectedClient
     })
     .then(()=>
     {
        let result
        const collection=client.db("university").collection("student");
        console.log(req.body);
        return collection.deleteOne({srn:req.params.sid});
     })
     .then((result)=>{
         console.log((result));
         res.send(result);
             
     })
     .catch((err)=>{
         console.log(err)
     
     })
 })
 
module.exports=router;




