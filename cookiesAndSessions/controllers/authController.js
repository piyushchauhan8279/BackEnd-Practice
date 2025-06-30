const Home=require('../models/home')

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login form",
    currentPage: "login"
  });
};

exports.postLogin = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  });
};