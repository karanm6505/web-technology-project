/* Execute this server code, then goto browser and type localhost:8080/, server sends index.html file as a response. If you type localhost:8080/file.txt Server reads the file requested in the URL and then sending it as a response. If the file is not found, it returns a "404 File not found" message*/

var url= require('url');
var http=require('http');
var fs=require('fs');
http.createServer( function(request, response){
    if(request.method=='GET'){
        var myurl=url.parse(request.url)
        var pathname=myurl.pathname;
        if(pathname=='/'){
            pathname="/index.html"
        }
   // response.write('Welcome to my domain!!!');
        fs.readFile(pathname.substr(1),function(err,data){
            if(err){
                response.writeHead(404,{'Content-type':'text/html'});
                response.write("<h1> File not found</h1>")
                response.end();
            }
            else {
            response.writeHead(200,{'Content-type':'text/html'});
            response.write(data);
            response.end();
            }
        })
    }
    
}).listen(8080);
console.log("Server is up and running on http://localhost:8080");