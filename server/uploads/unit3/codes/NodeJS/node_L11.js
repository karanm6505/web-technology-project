
console.log("Hello World")
const name1="Ram"
console.log("hello",name1)
setTimeout(()=>{
    console.log("Timer Stopped")
}, 2000)
console.log("timer Started")
/*const fs=require('fs')
fs.stat("U4_P1.js",(err,stats)=>{
    
    if(err) throw err
    console.log("stats of the file",JSON.stringify(stats))
})*/
/*const fs=require('fs')
fs.rename("U4_P1.js","New_U4_P1.js",(err)=>{
    console.log("Rename Sucessful")
    fs.stat("New_U4_P1.js",(err,stats)=>{
        if(err) throw err
        console.log("stats of the file",JSON.stringify(stats))
    })
})*/
/*const fs=require('fs')
fs.readFile("U4_P1.js","UTF-8", (err,data)=>{
    if(err) throw err
    console.log("Contents of file are",data)
})
   console.log("Reading the contents of the file")
 */
  /* const fs=require('fs')
    fs.readFile("U4_P1.js", (err,data)=>{
        if(err) throw err
        var text=data.toString()
        console.log("Contents of file are",text)
    })
        console.log("Reading the contents of the file") 
*/
/*const fs=require('fs')
const data=fs.readFileSync("U4_P1.js", "UTF-8")
console.log("Contents of the file are", data)
console.log("Reading the contents of the file")
console.log("File data ends here") */
const fs=require('fs')
fs.readFile("U4_P1.js", function(err,data){
    if(err)
    {
        console.log(err)
    }
    setTimeout(()=>{
        console.log("PES University Display after 2 seconds")
    }, 2000)
    })
    console.log("Starts here")
    
    