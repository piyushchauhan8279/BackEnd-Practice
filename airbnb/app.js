// external module
const express=require('express')

// customs modules
const userRouter=require('./routes/user')
const hostRouter=require('./routes/host')


// create express app
const app=express()


// adding middlewares

app.use((req,res,next)=>{
  console.log(req.url + req.method);
  next();
})

app.use(express.urlencoded());
app.use(userRouter)
app.use("/host",hostRouter) // common path 


app.use((req,res,next)=>{
  res.sendFile(Path.join(__dirname,'views','404.html'))
})

const PORT=3000
app.listen(PORT,()=>{
  console.log(`Server is listening at http://localhost:${PORT}`);
})

