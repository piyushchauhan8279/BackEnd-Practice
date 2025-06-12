// external module 
const express =require('express')
// core module
const path=require('path')

const hostRouter=express.Router()

// local module

const rootDir=require('../utils/path')


hostRouter.get("/add-home",(req,res,next)=>{
  res.render('add-home',{pageTitle:'Add Home'})
})

const houses=[]
hostRouter.post("/add-home",(req,res,next)=>{
  console.log(req.body);
  houses.push({
  house: req.body.house,
  price: req.body.price,
  rating: req.body.rating,
  url: req.body.url
});

  console.log(houses);
  res.render('home-added',{pageTitle:'Added'})
})

hostRouter.use(express.static(path.join(rootDir,'public')))

// now we have to export more than 1 module
module.exports.hostRouter=hostRouter
module.exports.houses=houses
