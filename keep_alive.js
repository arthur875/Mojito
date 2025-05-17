var http = require('http');

http.createServer(function (req, res) {
    res.write("I'm alive :D");
    res.end();
}).listen(8080);