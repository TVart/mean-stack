/**
 * Created by lilit on 02/07/2016.
 */
var Task = require('./task.model');

module.exports.create = function(req,res){
    var task = new  Task(req.body);
    task.save(function (err, result) {
        res.json(result)
    });
};

module.exports.list = function(req,res){
    Task.find({}, function (err, result) {
        res.json(result)
    });
};