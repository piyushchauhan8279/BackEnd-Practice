const houses = []; // acts as an in-memory fake DB

exports.House = class House {
  constructor(house, price, rating, url) {
    this.house = house;
    this.price = price;
    this.rating = rating;
    this.url = url;
  }

  save() {
    houses.push(this);
  }

  static fetchAll() {
    return houses;
  }
};
