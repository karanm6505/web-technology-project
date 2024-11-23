const fs=require('fs')
//fs.writeFile
/*fs.appendFile("test1.txt", 
    "\nContent to be Written is this again and again!!!",
    function (err){
        if(err) console.log(err)
        console.log("Write Sucessful!!!")
    }) */
  /*  fs.open("test1.txt", "w", function(err,file){
        if(err) throw err;
        fs.write(file,"Contents for writing this", function(err){
            if(err) throw err;
            console.log("Saved!!")
        })
    })*/
   /* var data=fs.readFileSync("test.txt", 'utf-8')
    var lines=data.split(/\r?\n/)
    lines.forEach((line)=>{
        var words=line.split(',');
        console.log(words[1]);
    })*/
    /*readline=require('readline');
    r1=readline.createInterface({
        input:fs.createReadStream("test.txt"),
        output:process.stdout,
        terminal:false
    })
    r1.on('line',function(line){
        var words=line.split(',');
        console.log(words[1]);
    })*/
    readline=require('readline');
    r1=readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        terminal:false
    })
    r1.on('line',function(line){
        var words=line.split(',');
        console.log(words[1]);
    })