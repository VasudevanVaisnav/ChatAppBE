const http = require('http');
const app = require('./app');
http.createServer(app).listen(6666,()=>{
  console.log("server started at 6666")
});