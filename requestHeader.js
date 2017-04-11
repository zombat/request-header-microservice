var express = require('express');
var http = require('http');
var app = express();
var fs = require('fs');

app.get('/about/', function(httpRequest, httpResponse){
	httpResponse.sendFile(__dirname + '/about.html');
});

app.get('/', function(request, response){
    response.writeHead(200, { "Content-Type": "application/json" });
    var theOS = request.headers['user-agent'].match(/\((.+\d)\)/);
    theOS = theOS[0].substring(1,theOS[0].length-1);
    var requestHeaders = { 
        'ipaddress' : request.ip,
        'language' : request.headers['accept-language'].split(',')[0],
        'software' : theOS
    }; 
    response.end(JSON.stringify(requestHeaders));
});

app.listen(process.env.PORT);