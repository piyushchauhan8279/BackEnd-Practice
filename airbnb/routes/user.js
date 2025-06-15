const express =require('express');
const path=require('path')
const userRouter=express.Router()



const rootDir=require('../utils/path')

const userController=require('../controllers/home')
userRouter.get("/",userController.user)

userRouter.use(express.static(path.join(rootDir,'public')))

module.exports=userRouter