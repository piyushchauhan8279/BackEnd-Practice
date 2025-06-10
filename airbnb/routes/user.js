const express =require('express');

const userRouter=express.Router()

userRouter.get("/",(req,res,next)=>{
  res.sendFile(Path.join(__dirname,'../','views','home.html'))
})


module.exports=userRouter