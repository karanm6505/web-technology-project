/* Execute this server code, then goto browser and type localhost:8080/sample.txt?srn=18. Server code now handles GET requests and attempts to read data from an HTML file, parsing it as JSON to return a user's name based on the student registration number (SRN) provided in the query string. */
/*If sample.txt file contains multiple rows, this code does not work, does not handle multiple rows*/

var url= require('url');
var http=require('http');
var fs=require('fs');
var qs=require('querystring')
http.createServer( function(request, response){
    if(request.method=='GET'){
        var myurl=url.parse(request.url)
        var pathname=myurl.pathname;
        if(pathname=='/'){
            pathname="/index.html"
        }
   
   //http://localhost:8080/sample.txt?srn=1234
        fs.readFile(pathname.substr(1),'utf-8', function(err,data){
            if(err){
                response.writeHead(404,{'Content-type':'text/html'});
                response.write("<h1> File not found</h1>")
                response.end();
            }
            else {
                response.writeHead(200,{'Content-type':'text/html'});
                var obj=JSON.parse(data);                     
                var query=myurl.query; //?srn=1234&& dept=cse
                var qobj= qs.parse(query) //{"srn":"1234"}
                 if(obj.srn==qobj.srn)
                      response.write("<h1>"+obj.name+"</h1>");
                
                 response.end();
                }
        })
    }
    
}).listen(8080);
console.log("Server is up and running on http://localhost:8080");