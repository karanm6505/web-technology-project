/*
const buf1=Buffer.alloc(10,'Hi welcome')
const buf2=Buffer.alloc(17,' to pes university');
console.log("Buffer1",buf1.toString());
console.log("Buffer2",buf2.toString());
const totallength=buf1.length+buf2.length;
console.log(totallength);
const buf3=Buffer.concat([buf1,buf2]);
console.log(buf3.toString());
console.log(buf3.length);
*/
/*
const buf1=Buffer.alloc(10,'Hi welcome');
const buf2=Buffer.alloc(10,'Hi welcome');
var result=buf1.compare(buf2);
if(result<0)
{
    console.log(buf1+ " comes before"+ buf2);
 }
 else if(result===0)
 {
     console.log(buf1+ " is same as "+buf2);
 }
 else
 {
     console.log(buf1+" comes after "+buf2);
 }
 var buf3=Buffer.alloc(25);
 buf2.copy(buf3);
 console.log("Buffer2 content is copied to Buffer 3 "+buf3.toString());
 console.log(buf3.toString());
*/
 
 var fs=require('fs')
 var data='';
 var rs=fs.createReadStream('data.txt');
 rs.setEncoding('UTF-8');
 rs.on('data',function(chunk){
     data+=chunk;
     
 });
 rs.on('end',function(chunk){
     console.log(data);
 })
 rs.on('err',(chunk)=>{
     console.log(err.stack);
 })
 
 
 /*var fs=require('fs')
 var data=" You are learning Buffers and Streams"
 var ws=fs.createWriteStream('ex.txt');
 ws.write(data,'UTF-8');
 ws.end();
 ws.on('finish',function(){
     console.log('Write Completed');
 })
 ws.on('error',function(err){
     console.log(error.stack);
 })
 console.log('program ended')
 */
/*
 var fs = require('fs');
 var zlib = require('zlib');
 
 //compress the file data.txt to gz format
 
 fs.createReadStream('data.txt')
 .pipe(zlib.createGzip())
 .pipe(fs.createWriteStream('data.txt.gz'));
 
 console.log('File compressed');
 
 //Decompress the file for reading
 /*
 fs.createReadStream('data.txt.gz')
 .pipe(zlib.createGunzip())
 .pipe(fs.createWriteStream('data.txt'));
 console.log('File Decompressed');
 */