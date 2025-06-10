const express=require("express")
const app=express()

PORT=3000

// adding two dummy middlewares

app.use((req,res,next)=>{
    console.log("coming in first dummy middleware");
    console.log(req.url +" "+ req.method);
    next();
})

app.use((req,res,next)=>{
    console.log("coming in second dummy middleware");
    console.log(req.url +" "+ req.method);
    next();
})

app.use((req,res,next)=>{
  if(req.url=="/"){
    console.log("coming in third middleware");
    console.log(req.url +" "+ req.method);
    //  res.send('<h1>Sending response from Third middleware </h1>')
  }
  next();
})


// / path middleware

app.get("/",(req,res,next)=>{
  console.log(`Welcome from ${req.url}`);
})
// /contact-us middleware

app.get("/contact-us",(req,res,next)=>{
  console.log("we are in contact-us midddleware");
  res.send('<html><body><form action="contact-us" method="post"><label for="name">Name</label><input type="text" placeholder="Enter Your Name" id="name-input" name="name"><label for="mail">E-mail</label><input type="email" placeholder="Enter your Email" id="email-input" name="mail" ><button type="submit">Submit</button></form></body></html>')
})

app.post("/contact-us",(req,res,next)=>{
  res.send('<h1>we will contact you shortly</h1>')
})


app.listen(PORT,()=>{
console.log(`Server is listening at http://localhost:${PORT}`);
})