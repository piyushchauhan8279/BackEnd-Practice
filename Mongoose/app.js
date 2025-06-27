// Core Module
const path = require('path');
const mongoose=require('mongoose')
// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
// const {mongoConnect}=require('./utils/dbUtil')

// for testing
// const db=require('./utils/dbUtil');
// const { error } = require('console');

// db.execute('SELECT * FROM homes').then(([rows,field])=>{
//   console.log(rows); // restructured the result 
//   console.log(field);
// }).catch(error=>{
//   console.log(error);
// })

const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);



const PORT = 3000;
const DB_path="mongodb+srv://Piyush:root@kaku.kyznke9.mongodb.net/airbnb?retryWrites=true&w=majority&appName=kaku"


mongoose.connect(DB_path).then(()=>{
  console.log("connected successfully");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(error=>{
  console.log("error while connecting with mongoose"+error);
  
})



