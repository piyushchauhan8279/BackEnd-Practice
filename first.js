// use fs module of nodejs

const { error } = require('console')
const fs=require('fs')

fs.writeFile("output.txt","creating a new output file",(error)=>{
  if(error){
    console.log("There is something wrong");
    
  }
  else{
    console.log("Task Completed Successfully");  
  }
})