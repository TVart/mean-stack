var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var tvlibs = require('./tvlibs');

var app = express();

var port = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// load middlewares
app.use(cookieParser());
//app.use(bodyParser.json({
app.use(bodyParser.urlencoded({
    extended: true
}));

//app.use(express.static('uploads'));
//app.use(express.static('files'));
//app.use(express.static(__dirname + '/public'));
//.use(express.favicon(__dirname+'/public/favicon.ico'));

app.use(function(req,res,next){
    //check session
    next();
});

app.get('/', function (req, res) {
    res.redirect('list')});

app.get('/list', function (req, res) {
    res.render('index',{clientId:"West Summer Set"});});

//app.post('/api/tasks', task.create);

app.put('/list/del/:id', function (req, res) {
    res.render('index');});

app.get('/test', function (req, res) {
    var amis=['Robert','Jacques','David'];
    res.render('test',{
        //etage:req.params.etagenum
        nom:"tvart",
        age:32,
        amis:amis
    });
});

app.get('/tvlibs', function (req, res) {
    myRectangle = tvlibs(1,2, function(err,rectangle) {
        if (err) {console.log(err);}
        else {
            //console.log("The area of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rectangle.area());
            //console.log("The perimeter of a rectangle of dimensions length = " + l + " and breadth = " + b + " is " + rectangle.perimeter());
            console.log(rectangle);
        }
    });
    console.log(myRectangle);
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(myRectangle);
});

app.use(function(req, res, next){
    res.render('404');
});

app.listen(port, function () {
    console.log('Example app listening on port '+port);
});