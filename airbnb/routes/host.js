

// external module 
const express = require('express')
// core module
const path = require('path')
const rootDir = require('../utils/path')
const hostController = require('../controllers/home')

const hostRouter = express.Router()

// local module
hostRouter.get("/add-home", hostController.homeAdd)
hostRouter.post("/add-home", hostController.addHome)

hostRouter.use(express.static(path.join(rootDir, 'public')))

// now we have to export more than 1 module
module.exports.hostRouter = hostRouter
module.exports.houses = hostController.houses