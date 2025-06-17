// models work is to do data handling 

const path=require('path')
const fs=require('fs')
const rootDir=require('../utils/path')

// fake database 

// let houses=[]


module.exports= class Home{
  constructor(house, price, rating, url){
    this.house=house;
    this.price=price;
    this.rating=rating;
    this.url=url;
  }

  save(){
    Home.fetchAll(houses=>{  
      houses.push(this)
      const filePath=path.join(rootDir,'data','file.json')
      fs.writeFile(filePath,JSON.stringify(houses),error=>{
        console.log("file written",error);
      })
    })
  }

  static fetchAll(callback){
    // read data from file

    const filepath=path.join(rootDir,'data','file.json')
    fs.readFile(filepath,(error,data)=>{
      console.log(error,data);
      if (error) {
      // File does not exist or other error
      callback([]);
    } else {
      // Check if file is empty
      if (!data || data.length === 0) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    }
    })
  }
}