const express =require('express');
const path=require('path')
const userRouter=express.Router()

const {houses}=require('./host')

const rootDir=require('../utils/path')
userRouter.get("/",(req,res,next)=>{
  res.render('home',{houses})
})

userRouter.use(express.static(path.join(rootDir,'public')))

module.exports=userRouter