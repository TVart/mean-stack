/**
 * Created by lilit on 02/07/2016.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Task',{
    //name:{type:String, required:true}
    name: String
});