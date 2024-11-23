var http=require('http');
var url=require('url')
var fs=require('fs');
var qs=require('querystring')
var MongoClient= require('mongodb').MongoClient;
http.createServer(function(request,response){
    if(request.method=='GET'){
        var myurl=url.parse(request.url);
        var url1='mongodb://127.0.0.1:27017'
    MongoClient.connect(url1)
    .then((connectedClient)=>
    {
        client=connectedClient
    })
    .then(()=>
    {
       let result
       const collection=client.db("university").collection("student")
       return collection.find().toArray(result)
    })
    .then((result)=>{
       // console.log("document updated")
        console.log((result));
        response.writeHead(200,{'Content-type':'application/json'});
        response.write(JSON.stringify(result));
        client.close();
        response.end();                     
    })
    .catch((err)=>{
        console.log(err)
    
    })
}
}).listen(8080);

console.log("Server is up and running")