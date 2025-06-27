// import mongodb

const mongo=require('mongodb')

const MongoClient=mongo.MongoClient; // we can directly use mongo.mongoClient
// console.log(MongoClient);

const mongoURL="mongodb+srv://Piyush:root@kaku.kyznke9.mongodb.net/?retryWrites=true&w=majority&appName=kaku" // not a secure way

// forming connection

let _db;


const mongoConnect = (callback) => {
  MongoClient.connect(mongoURL).then((client) => {
    _db = client.db('aibnb'); // connect to 'aibnb' database
    callback();               // call the callback after successful connection
  }).catch((error) => {
    console.log("error while connecting with mongo" + error);
  });
};


const getDB=()=>{
  if(!_db){
    throw new Error ('mongo not connected')
  }
  else{
    return _db;
  }
}


exports.mongoConnect=mongoConnect;
exports.getDB=getDB;