exports.error=(req,res,next)=>{
  res.render('404',{'pageTitle':'Not found'})
}