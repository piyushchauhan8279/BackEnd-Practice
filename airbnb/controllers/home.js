// user controller 

const {houses}=require('../routes/host')

exports.user=(req,res,next)=>{
res.render('home', { houses, pageTitle: 'Home Page' });
}

