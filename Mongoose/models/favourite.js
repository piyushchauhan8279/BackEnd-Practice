
module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  // save or we can say (add to favourite method)

  save(homeId) {
    const db = getDB();

    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((already) => {
        if (!already) {
          return db.collection("favourites").insertOne(this);
        } else {
          return Promise.resolve();
        }
      });
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDB();
    return db
      .collection("favourites")
      .deleteOne({ homeId: delHomeId.toString() });
  }
};
