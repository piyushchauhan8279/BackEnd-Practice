const express =require('express')
// core module
const path=require('path')

const hostRouter=express.Router()

// local module

const rootDir=require('../utils/path')


hostRouter.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','add-home.html'))
})

hostRouter.post("/add-home",(req,res,next)=>{
  // console.log(req.body);
  res.sendFile(path.join(rootDir,'views','home-added.html'))
})

hostRouter.use(express.static(path.join(rootDir,'public')))

module.exports=hostRouter