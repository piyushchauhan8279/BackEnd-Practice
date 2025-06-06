// creating server

const http=require('http')

const server=http.createServer((req,res)=>{
  if(req.url.toLowerCase()=='/'){
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<head><title>Home Page</title></head>')
    res.write('<body>')
    res.write('<div>')
    res.write(`<ul><li><a href="/home">Home</a></li><li><a href="/men">Men</a></li><li><a href="/women">Women</a></li><li><a href="/kids">Kids</a></li><li><a href="/cart">Cart</a></li></ul>`);
    res.write('</div>')


    res.write('<style>body{margin:0;padding:0;font-weight:bold;}div{background-color:#753775 ; padding:20px} ul{display:flex;justify-content:space-between} li{list-style-type:none;}a{text-decoration:none ;color:white} li:hover{cursor:pointer;}</style>')
    res.write('</body>')

    res.write('</html>')
    return res.end()
    

  }
  else if(req.url==='/home'){
    res.write('<h1>Welcome to Home Page</h1>')
    return res.end()
  }
  else if(req.url==='/men'){
    res.write('<h1>Welcome to Mens Page</h1>')
    return res.end()
  }
  else if(req.url==='/women'){
    res.write('<h1>Welcome to Womens Page</h1>')
    return res.end()
  }
  else if(req.url==='/kids'){
    res.write('<h1>Welcome to Kids Page</h1>')
    return res.end()
  }
  else{
    res.write('<h1>Welcome to Cart Page</h1>')
    return res.end()
  }
})
const PORT=3000
server.listen(PORT,()=>{
  console.log(`Server is Listening at http://localhost:${PORT}`);
})