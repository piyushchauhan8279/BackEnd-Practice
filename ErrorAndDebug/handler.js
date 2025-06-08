const syntaxTesting=require('./syntax')
const runtime=require('./runtime')
const logical=require('./logical')
const RequestHandler=(req,res)=>{
  console.log(req.url, req.method);
  // syntaxTesting()
  // runtime()

  logical()
}

module.exports=RequestHandler