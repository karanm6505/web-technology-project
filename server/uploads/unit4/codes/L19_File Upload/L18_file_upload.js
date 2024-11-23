const express = require("express");
const fileupload = require("express-fileupload");
const fs=require("fs");//file system

var app=express();


app.use(fileupload())

app.get('/',(req,res)=>
{
	res.sendFile(__dirname+'/index.html')
})

app.post('/',(req,res)=>
{
	if(req.files)
		console.log(req.files);

//select file and display
	var file=req.files.file;
	var filename=file.name;
	console.log(filename);

//select and move(upload)
	file.mv('./files/'+ filename,function(err)
	{
		if(err)
		{
			res.send(err);
		}else
		{
			res.send("File " + file.name + "uploaded ");
		}
	})
})

app.listen(3000,function(){
	console.log("Server up at 3000")
});