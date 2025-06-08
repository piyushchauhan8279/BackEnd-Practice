const http = require('http');

const reqHandler=require('./app').handler;
const E=require('./app').extra;
console.log(E);

const server = http.createServer(reqHandler);

const PORT = 3003;
server.listen(PORT, () => {
  console.log(`Server is Listening at http://localhost:${PORT}`);
});