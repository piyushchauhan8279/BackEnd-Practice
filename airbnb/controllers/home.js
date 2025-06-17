const Home=require('../models/houses')

// host controller 
exports.homeAdd = (req, res, next) => {
  res.render('add-home', { pageTitle: 'Add Home' })
}

// add home controller
exports.addHome = (req, res, next) => {
  // console.log(req.body);
  const { house, price, rating, url } = req.body;
  const home=new Home(house, price, rating, url );
  home.save();
  res.render('home-added', { pageTitle: 'Added' })
}


// user controller 
exports.user = (req, res, next) => {
  Home.fetchAll(houses=>{
    res.render('home', { houses, pageTitle: 'Home Page' });
  });
}

// exports.houses = houses