// models work is to do data handling 


// fake database 

const houses=[]


module.exports= class Home{
  constructor(house, price, rating, url){
    this.house=house;
    this.price=price;
    this.rating=rating;
    this.url=url;
  }

  save(){
    houses.push(this);
  }

  static fetchAll(){
    return houses;
  }
}