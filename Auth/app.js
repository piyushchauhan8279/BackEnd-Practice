// Core Module
const path = require('path');
// const cookieParser = require('cookie-parser');
const session=require('express-session')
const mongodbStore=require('connect-mongodb-session')(session)

const DB_PATH = "mongodb+srv://Piyush:root@kaku.kyznke9.mongodb.net/?retryWrites=true&w=majority&appName=kaku";
// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter=require('./routes/authRouter')
const rootDir = require("./utils/pathUtil");

const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store=new mongodbStore({
uri:"mongodb+srv://Piyush:root@kaku.kyznke9.mongodb.net/",
collection:'session'
})

app.use(session({
  secret:"kaku",
  resave:false,
  saveUninitialized:true,
  store:store,
}))

app.use((req, res, next) => {
  req.isLoggedin = req.session.isLoggedin;
  next();
});

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", (req,res,next)=>{
  if(req.isLoggedin){
    next();
  }
  else{
    return res.redirect("/login")
  }
});
app.use("/host", hostRouter);
app.use(authRouter)

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
