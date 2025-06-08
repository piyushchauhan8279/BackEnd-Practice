const http=require('http')
const syntaxTesting=require('./syntax')

const RequestHandler=require('./handler')
const server=http.createServer(RequestHandler)
const PORT=3000
server.listen(PORT,()=>{
  console.log(`Server is Listening at http://localhost:${PORT}`);
})
