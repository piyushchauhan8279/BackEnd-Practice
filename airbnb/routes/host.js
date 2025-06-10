const express =require('express')
// core module
const path=require('path')

const hostRouter=express.Router()

hostRouter.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(__dirname,'../','views','add-home.html'))
})

hostRouter.post("/add-home",(req,res,next)=>{
  // console.log(req.body);
  res.sendFile(path.join(__dirname,'../','views','home-added.html'))
})

module.exports=hostRouter