var request = require('request');
var http = require('http');
var cors = require ('cors');
var fs = require('fs');

http.createServer(function(req,res)
{
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
        return;
    }
    var x = request('http://www.youtube.com/embed/XGSy3_Czz8k')
    req.pipe(x)
    x.pipe(res)
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');