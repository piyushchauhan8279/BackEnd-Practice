const db = require("../utils/dbUtil");

module.exports = class Home {
  constructor(id, houseName, price, location, rating, description,photoUrl) {
    this.id = id;
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.description = description;
    this.photoUrl = photoUrl;
  }

  save() {
    return db.execute(
      "INSERT INTO homes (houseName,price,location,rating,description,photoUrl) VALUES(?,?,?,?,?,?)",
      [
        this.houseName,
        this.price,
        this.location,
        this.rating,
        this.description,
        this.photoUrl,
      ]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id=?',[homeId])
  }

  update() {
  return db.execute(
    "UPDATE homes SET houseName=?, price=?, location=?, rating=?, description=?, photoUrl=? WHERE id=?",
    [this.houseName, this.price, this.location, this.rating, this.description, this.photoUrl, this.id]
  );
}

  static deleteById(homeId) {
    return db.execute('DELETE FROM homes WHERE id=?',[homeId])
  }
};
