exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login form",
    currentPage: "login",
    isLoggedin:false,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedin=true;
  res.redirect("/");
};

exports.postlogout=(req,res,next)=>{
  req.session.destroy(()=>{
    res.redirect("/login");
  })
}