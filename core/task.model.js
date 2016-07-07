/**
 * Created by lilit on 02/07/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

var taskSchema = new Schema({
    name: String
});

userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

taskSchema.methods.clean = function() {
    // strip html tags
    this.name = this.name.replace(/<\/?[^>]+(>|$)/g, "");
    //this.name = this.name.replace(/<a\b[^>]*>(.*?)<\/a>/i,"");
    //this.name = this.name.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    return this.name;
};

module.exports = mongoose.model('Task',taskSchema);