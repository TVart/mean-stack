var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    tvlibs = require('./core/tvlibs'),
    tasksController = require('./core/task.controller');

var app = express();

var dns = process.env.DSN || require('./core/db.js').dsn;
var port = process.env.PORT || 8080;
mongoose.connect(dns);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('uploads'));

// load middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var tasks = [
    {id:1, name:'task 1'},
    {id:2, name:'task 2'},
    {id:3, name:'task 3'},
    {id:4, name:'task 4'}
];

app.use(function(req,res,next){
    if(req.url.split('/')[1]=='api'){res.setHeader('Content-Type', 'application/json');}
    next();
});


app.get('/', function (req, res) {
    res.render('index',{
        copyear:"2016",
        clientId:"West Summer Set"
    });
});

app.get('/apropos', function (req, res) {
    var amis=['Robert','Jacques','David'];
    res.render('apropos',{
        nom: req.get('User-Agent'),
        age:32,
        amis:amis,
        api:[
            { action: "list", verb:"GET", uri:"/api/tasks"},
            { action: "show", verb:"GET", uri:"/api/tasks/:id"},
            { action: "create", verb:"POST", uri:"/api/tasks"},
            { action: "update", verb:"PUT", uri:"/api/tasks"},
            { action: "remove", verb:"DELETE", uri:"/api/tasks"}
        ]
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

app.delete('/api/v2/tasks/:id', tasksController.remove);
//app.put('/api/v2/tasks/:id', tasksController.update);
app.get('/api/v2/tasks/:id', tasksController.getById);
app.get('/api/v2/tasks', tasksController.list);
app.post('/api/v2/tasks', tasksController.create);

app.get('/api', function (req, res) {
    res.redirect('/api/tasks')
});

//list
app.get('/api/tasks', function (req,res) {
    res.status(200).send(tasks);
});

//show
app.get('/api/tasks/:id', function (req,res) {
    var obj={};
    for(task in tasks){
        if(tasks[task].id == req.params.id){
            obj = tasks[task];
            break
        }
    }
    if(obj.hasOwnProperty('id')){
        obj.status = "success";
        res.status(200).send(obj);
    }else{
        obj.status = "error";
        obj.error = "task "+req.params.id+" not found";
        res.status(301).send(obj);
    }
});

//create
app.post('/api/tasks', function (req, res) {
    last_id=tasks[tasks.length-1].id;
    tasks.push({
        id:parseInt(last_id)+1,
        name:req.body.name
    });
    res.redirect('/api')
});

//update
app.put('/api/tasks', function (req, res) {
    for(task in tasks){
        if(tasks[task].id == req.body.id){
            tasks[task].name=req.body.name;
            break
        }
    }
    res.redirect('/api')
});

//delete
app.delete('/api/tasks', function (req, res) {
    for(task in tasks){
        if(tasks[task].id == req.body.id){
            if (parseInt(task) > -1) {
                tasks.splice(task, 1);
            }
            break;
        }
    }
    res.redirect('/api')
});


app.use(function(req, res, next){
    res.render('404');
});

app.listen(port, function () {
    console.log('Example app listening on port '+port);
});