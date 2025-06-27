const {getDB}=require('../utils/dbUtil')
const {ObjectId}=require('mongodb')

module.exports = class Home {
  constructor(_id, houseName, price, location, rating, description,photoUrl) {
    if(_id){
      this._id = _id;
    }
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.description = description;
    this.photoUrl = photoUrl;
  }

  save() {
    const db=getDB();
    const update={
      houseName: this.houseName,
      price: this.price,
      location: this.location,
      rating: this.rating,
      description: this.description,
      photoUrl: this.photoUrl,
    }

    if(this._id){ // update ka case hai 
      return db.collection('homes')
      .updateOne(
        {_id:new ObjectId(String(this._id))},
        {$set:update}
      );
    }
    else{
      // insert ka case hai

      return db.collection('homes').insertOne(this);
    }
    
  }

  static fetchAll() {
    const db=getDB();
    return db.collection('homes').find().toArray();
  }

  static findById(homeId) {   
    const db=getDB();
    return db.collection('homes').find({_id:new ObjectId(String(homeId))}).next();
  }

  static deleteById(homeId) {
    const db=getDB();
    return db.collection('homes').deleteOne({_id:new ObjectId(String(homeId))});
  }
};
