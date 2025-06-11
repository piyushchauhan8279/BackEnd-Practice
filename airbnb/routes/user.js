const express =require('express');
const path=require('path')
const userRouter=express.Router()


const rootDir=require('../utils/path')
userRouter.get("/",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','home.html'))
})

userRouter.use(express.static(path.join(rootDir,'public')))

module.exports=userRouter