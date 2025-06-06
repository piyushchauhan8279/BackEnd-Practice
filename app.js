// creating a nodejs server 


const fs=require('fs');
// const { log } = require('util');

const requestHandler=(req, res) => {
  console.log(req.url, req.method);

  // process.exit();
  if(req.url==='/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Page</title></head>');
    res.write('<body><h1>Hii, My Name is Piyush</h1></body>');
    res.write('</html>');
    return res.end();
  }
  else if(req.url==='/form'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>form</title></head>');
    res.write('<body><h1>Enter Your Details</h1></body>');
    res.write('<form action="/submit"  method="POST">')
    res.write('<label>Enter Name : </label>')
    res.write('<input type="text" id="name" name="name" placeholder="Enter Your Name" >')
    res.write('</br>')
    res.write('<label>Select Your Gender : </label></br>')
    res.write('<label>Male</label>')
    res.write('<input type="radio" id="male" name="gender" value="male">')
    res.write('<label>Female</label>')
    res.write('<input type="radio" id="female" name="gender" value="female">')
    res.write('<button type="submit">Submit</button>')
    res.write('</form>')
    res.write('</html>');
    return res.end();
  }
  else if(req.url.toLowerCase()==='/submit' && req.method==='POST'){
    // redirecting 
    res.setHeader('Location', '/');
    res.statusCode=302
    
    // fs.writeFileSync("My.txt","name:- Piyush",()=>{
    //   console.log("successfully wotking");
      
    // })

    const body=[]
    req.on('data',(chunks)=>{
      console.log(chunks);
      body.push(chunks)
    })

    req.on('end',()=>{
      const fullBody=Buffer.concat(body).toString()
      const params=new URLSearchParams(fullBody)
      bodyObj={}
      bodyObj=Object.fromEntries(params)
      console.log(bodyObj);

      fs.writeFileSync('My.txt',JSON.stringify(bodyObj))
      
    })
    return res.end();
  }
  else{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Learning</title></head>');
    res.write('<body><h1>Keep Learning and keep exploring</h1></body>');
    res.write('</html>');
    return res.end();
  }
};


module.exports={
  handler:requestHandler,
  extra:"Extra"
}