const express = require('express');
const app = express();

// Middleware for "/"
app.use("/", (req, res, next) => {
  console.log("Came in first middleware " + req.url + " " + req.method);
  if(req.url==="/"){
    res.send('<p>Hello, Piyush responding</p>');
  }
  else{
  next();
  }
});


// can't set headers after respond send to client 
app.use("/", (req, res, next) => {
  console.log("Came in another middleware " + req.url + " " + req.method);
    // res.send('<p>Hello, Piyush responding</p>');
    next();
});


// Middleware for "/details"
app.use("/details", (req, res, next) => {
  console.log("Came in second middleware " + req.url + " " + req.method);
  res.send('<p>Hello from /details</p>');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
