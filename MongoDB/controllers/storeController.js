const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.fetchAll().then((favs) => {
    console.log(favs); // array of document

    Home.fetchAll().then((registeredHomes) => {
      // Extract homeIds from favourites and convert to string for comparison
      const favHomeIds = favs.map((fav) => fav.homeId.toString());
      // Filter only homes that are in favourites
      console.log(favHomeIds); // all id arrays

      const favouriteHomes = registeredHomes.filter((home) =>
        favHomeIds.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "Host Homes List",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;

  const fav = new Favourite(homeId);
  fav
    .save(homeId)
    .then((result) => {
      console.log("added to favourites:", homeId);
    })
    .catch((error) => {
      console.log("error:" + error);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Removing homeId:", homeId);

  if (!homeId) {
    console.log("homeId param is missing");
    return res.redirect("/favourites");
  }

  Favourite.deleteById(homeId)
    .then((result) => {
      console.log("Fav Removed: ", result);
    })
    .catch((err) => {
      console.log("Error while removing favourite: ", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};
