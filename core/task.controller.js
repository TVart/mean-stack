/**
 * Created by lilit on 02/07/2016.
 */
var Task = require('./task.model');

module.exports.create = function(req,res){
    var task = new  Task(req.body);

    task.clean(function (err, name) {
        if (err) throw err;
        console.log('Your new name is ' + name);
    });

    task.save(function (err, result) {
        if (err) throw err;
        console.log('User saved successfully!');
        res.json(result)
    });
};

module.exports.remove = function(req,res){
    Task.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        // we have deleted the user
        console.log('User deleted!');
    });
};

module.exports.list = function(req,res){
    Task.find({}, function (err, result) {
        if (err) throw err;
        res.json(result)
    });
};

module.exports.getByName = function (req, res) {
    Task.find({ name:req.body.name}, function(err, user) {
        if (err) throw err;
        // object of the user
        console.log(user);
        // jsonify the result
        res.json(result)
    });
};

module.exports.getById = function (req, res) {
    Task.findById(req.params.id, function(err, user) {
        if (err) throw err;
        // object of the user
        console.log(user);
        // jsonify the result
        res.json(result)
    });
};