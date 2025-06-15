
// external module
const express=require('express')

// customs modules
const userRouter=require('./routes/user')
const {hostRouter}=require('./routes/host')
const path=require('path')

// create express app
const app=express()

// set for engine template 

app.set('view engine','ejs')
app.set('views','views')


// adding middlewares


app.use((req,res,next)=>{
  console.log(req.url + req.method);
  next();
})

app.use(express.urlencoded());
app.use(userRouter)
app.use("/host",hostRouter) // common path 

const rootDir=require('./utils/path')

// for serving static files

// add middleware

app.use(express.static(path.join(rootDir,'public')))


const errorController=require('./controllers/error')

app.use(errorController.error)

const PORT=3000
app.listen(PORT,()=>{
  console.log(`Server is listening at http://localhost:${PORT}`);
})


