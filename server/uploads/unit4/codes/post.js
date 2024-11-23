var http=require('http');
var url=require('url')
var fs=require('fs');
var qs=require('querystring')
var MongoClient= require('mongodb').MongoClient;
http.createServer(function(request,response){
    if(request.method=='POST'){
        var myurl=url.parse(request.url);
        var query=myurl.query;
        var qobj=qs.parse(query);
        let body=[];
        request.on('data',(chunk)=>{
            body.push(chunk);
            console.log(chunk.toString())
        })
        .on('end',()=>{
            body=Buffer.concat(body).toString();
            console.log(body);
        })
    const { MongoClient } = require('mongodb');
const url1 = "mongodb://127.0.0.1:27017";
let client;
MongoClient.connect(url1)
    .then((connectedClient) => {
        client = connectedClient;
    })
    .then((res) => {
        const collection = client.db("university").collection("student");
        return collection.insertOne(JSON.parse(body))
    })
    .then((result) => {
        console.log("1 document inserted");
        console.log(result);
        response.writeHead(200,{'Content-type':'application/json'});
        response.write(JSON.stringify(result));
        client.close();
        response.end();                     
        
    })
    .catch((err) => {
        console.error("An error occurred:", err);
    })
}
    }).listen(8080)
console.log("Server is up and running");