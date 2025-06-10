// external modules
const express = require("express");
// const bodyParser = require("body-parser");
const app = express();

PORT = 3000;

const rootDir=require('./utils/path')

// local modules 

const userRouter=require('./routes/user')
const formRouter=require('./routes/form')

// core module
const path=require('path')

app.use((req,res,next)=>{
  console.log(req.url + " "+ req.method);
  next();
})


// adding two dummy middlewares

// app.use((req, res, next) => {
//   console.log("coming in first dummy middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("coming in second dummy middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("coming in third middleware");
//   next();
// });

// / path middleware

app.use(userRouter)

app.use(express.urlencoded());

// /contact-us middleware
app.use("/form",formRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(rootDir,'./views','404Error.html'))
})
