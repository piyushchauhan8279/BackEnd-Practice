const http=require('http');
const { type } = require('os');
const { URLSearchParams } = require('url');
const fs=require('fs')

const sum=require('./addition').addition
const server=http.createServer((req,res)=>{
  console.log(`Request URL :-->${req.url} Request Method  :-->${req.method}`);
  // process.exit()

  if(req.url==='/'){
    res.setHeader('Content-Type','text/html')
    res.write('<h1>Welcome Champ : You can Use Calculator by clicking on the Link given Below')
    res.write('</br>')
    res.write('<a href="/calculator">Click Here</a>')
    return res.end()
  }
  else if(req.url==='/calculator'){
    res.setHeader('Content-Type','text/html');
    res.write('<form action="/result" method="POST"><label for="">Enter first Number</label><input type="number" placeholder="Enter Number" id="num1" value="num1" name="number1"><label for="">Enter Second Number</label><input type="number" placeholder="Enter Second Number" id="nums2" value="nums2" name="number2"><button type="submit">Sum</button></form>')
    return res.end()
  }else if(req.url.toLocaleLowerCase()==='/result' && req.method=="POST"){
    res.setHeader('Content-Type','text/html');
    
    const body=[]
    req.on('data',(chunks)=>{
      // console.log(chunks);
      body.push(chunks)
    })
    
    req.on('end',()=>{
      const fullBody=Buffer.concat(body).toString()
      const params=new URLSearchParams(fullBody)
          bodyObj={}
          bodyObj=Object.fromEntries(params)
          let n1=parseInt(bodyObj.number1)
          let n2=parseInt(bodyObj.number2)
          let result=sum(n1,n2)
          // console.log(typeof n1);
          // console.log(typeof n2);
          
          // console.log(sum);
          
        res.write(`<h1>Sum is ${result}</h1>`)
        return res.end();
        })
      }


})

PORT=3000

server.listen(PORT,()=>{
  console.log(`Server is Listening at http://localhost:${PORT}`);
})
