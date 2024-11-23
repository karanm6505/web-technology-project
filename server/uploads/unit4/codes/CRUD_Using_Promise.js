//Create Database
/*
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://127.0.0.1:27017/university";
MongoClient.connect(url)
.then((db)=>{
    console.log("Database is created");
    db.close();
})
.catch((err)=>{
     console.log("An Error Occurred",err)
})


//Create Collection
/*
const {MongoClient}=require('mongodb');
const url="mongodb://127.0.0.1:27017";
let client;
MongoClient.connect(url)
.then((connectedClient)=>{
    client=connectedClient;
    const dbo=client.db("university");
    return dbo.createCollection("student");
    
})
.then((res)=>{
    console.log("Collection Created");
    client.close();
})
.catch((err)=>{
    console.error("Error occurred",err);
})
*/
//Insert One
/*
const {MongoClient}=require('mongodb');
const url="mongodb://127.0.0.1:27017";
let client;
MongoClient.connect(url)
.then((connectedClient)=>{
    client=connectedClient;
    const dbo=client.db("university");
    return dbo.createCollection("student");
    
})
.then((res)=>{
    console.log("Collection Created");
    // Insert example data
    const data ={name: "Janani", srn:"103"};
    const collection=client.db("university").collection("student");
    return collection.insertOne(data);
})
.then((res)=>{
    console.log("1 document inserted");
    client.close();
})
.catch((err)=>{
    console.error("Error occurred",err);
})
*/
//Insert Many
/*
const {MongoClient}=require('mongodb');
const url="mongodb://127.0.0.1:27017";
let client;
MongoClient.connect(url)
.then((connectedClient)=>{
    client=connectedClient;
    const dbo=client.db("university");
    return dbo.createCollection("student");
    
})
.then((res)=>{
    console.log("Collection Created");
    // Insert example data
    const data =[
                 {name: "Ayush", srn:"104"},
                 {name: "Ajay", srn:"105"}
                ];
    const collection=client.db("university").collection("student");
    return collection.insertMany(data);
})
.then((res)=>{
    console.log(`${res.insertedCount} document inserted`);
    client.close();
})
.catch((err)=>{
    console.error("Error occurred",err);
})
*/
//Find
/*
const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017";

let client;

MongoClient.connect(url)
    .then((connectedClient) => {
        let result;
        client = connectedClient;
        const dbo = client.db("university");
        collection=client.db("university").collection("student")
        return collection.find({},{projection:{_id:0,name:1}}).toArray(result);
    
    })
    .then((res) => {
        console.log(" Document fetched");
        console.log(JSON.stringify(res));

    })
    .catch((err) => {
        console.error("An error occurred:", err);
    });
*/
//Update
/*
const {MongoClient}=require('mongodb');
const url="mongodb://127.0.0.1:27017";
let client;
MongoClient.connect(url)
.then((connectedClient)=>{
    client=connectedClient;
    const dbo=client.db("university");
    var myquery={name:"Ajay"};
    var newvalue={$set:{name:"Krishna",age:21 }}
    return dbo.collection("student").updateOne(myquery,newvalue)
})     
.then((res)=>{
    console.log("Document updated");
    console.log(JSON.stringify(res));
   
})
.catch((err)=>{
    console.error("Error occurred",err);
})
*/
//drop
/*
const {MongoClient}=require('mongodb');
const url="mongodb://127.0.0.1:27017";
let client;
MongoClient.connect(url)
.then((connectedClient)=>{
    client=connectedClient;
    const dbo=client.db("university");
    var myquery={name:"Ayush"};
    return dbo.collection("student").deleteOne(myquery)
 })
.then((res)=>{
    console.log("Document deleted");
    client.close();
})
.catch((err)=>{
    console.error("Error occurred",err);
})
*/
//Drop Collection
/*
const {MongoClient}=require('mongodb');
const url="mongodb://127.0.0.1:27017";
let client;
MongoClient.connect(url)
.then((connectedClient)=>{
    client=connectedClient;
    const dbo=client.db("university");
    return dbo.collection("student").drop();
  
})
.then((res)=>{
    if(res){
    console.log("Collection deleted");}
    client.close();
})
.catch((err)=>{
    console.error("Error occurred",err);
})
*/

