exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login form",
    currentPage: "login",
    isLoggedin:false,
  });
};

exports.postLogin = (req, res, next) => {
  // req.isLoggedin=true;
  res.cookie('isLoggedin','true');
  res.redirect("/");
};