const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  }); 
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes,fields])=>{
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  }).catch(error=>{
    console.log("error");
  })
};

exports.postAddHome = (req, res, next) => {
  const {houseName, price, location, rating,description, photoUrl } = req.body;
  const home = new Home(null,houseName, price, location, rating,description, photoUrl);
  home.save().then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error=>{
    console.log(error);
  })
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, description,photoUrl } = req.body;
  const home = new Home(id,houseName, price, location, rating,description, photoUrl);
  // home.id = id;
  home.update().then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error=>{
    console.log(error);
  })
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log('Came to delete ', homeId);
  Home.deleteById(homeId).then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error=>{
    console.log(error);
  })
};