const express =require('express')
// core module
const path=require('path')

const hostRouter=express.Router()

// local module

const rootDir=require('../utils/path')


hostRouter.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','add-home.html'))
})

const houses=[]
hostRouter.post("/add-home",(req,res,next)=>{
  console.log(req.body);
  houses.push({house:req.body.house})
  console.log(houses);
  res.sendFile(path.join(rootDir,'views','home-added.html'))
})

hostRouter.use(express.static(path.join(rootDir,'public')))

// now we have to export more than 1 module
module.exports.hostRouter=hostRouter
module.exports.houses=houses
