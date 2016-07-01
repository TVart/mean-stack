var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var tvlibs = require('./tvlibs');

app.set('view engine', 'ejs');

//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    //res.sendFile(__dirname + '/index.html');
    res.render('index');
});

app.use(function(req, res, next){
    //res.setHeader('Content-Type', 'text/plain');
    //res.send(404, 'Page introuvable !');
    res.render('404');
});

app.listen(port, function () {
    console.log('Example app listening on port '+port);
});