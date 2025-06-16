// external module 
const express =require('express')
// core module
const path=require('path')

const hostRouter=express.Router()

// local module

const rootDir=require('../utils/path')


const hostController=require('../controllers/home')

console.log(hostController.hostAddHome);

// hostRouter.get("/add-home",hostController.hostAddHome)



const houses=[]
hostRouter.post("/add-home",(req,res,next)=>{
  // console.log(req.body);
  const {house,price,rating,url}=req.body;
  houses.push({house,price,rating,url})
  console.log(houses);
  res.render('home-added',{pageTitle:'Added'})
})

hostRouter.use(express.static(path.join(rootDir,'public')))

// now we have to export more than 1 module
module.exports.hostRouter=hostRouter
module.exports.houses=houses
