const express=require('express')

const formRouter=express.Router()

const rootDir=require('../utils/path')


const path=require('path')
formRouter.get("/contact-us", (req, res, next) => {
  console.log("we are in contact-us midddleware");
  res.sendFile(path.join(rootDir,'./views','form.html'))
})

formRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir,'./views','submitted.html'))
})


module.exports=formRouter