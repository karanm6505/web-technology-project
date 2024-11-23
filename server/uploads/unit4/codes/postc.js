var fetch=require('node-fetch')
fetch('http://127.0.0.1:8080',{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({"name":"Krishna","email":"xyz@gmail.com"})
})
.then((res)=>res.text())
.then((text)=>console.log(text))
