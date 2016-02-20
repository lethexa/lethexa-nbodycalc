var PORT = 8000;
var HOST = '127.0.0.1';
var express = require('express');
var http = require('http');
var app = express();

var serverPath = __dirname + '/public';
var leafletFile = __dirname + '/lethexa-nbodycalc.js';

app.use(express.static(serverPath));
app.get('/lethexa-nbodycalc.js', function(req, res) {
	res.sendFile(leafletFile);
});

var httpServer = http.createServer(app).listen(PORT);
console.log('Http-server started in port ' + PORT);
