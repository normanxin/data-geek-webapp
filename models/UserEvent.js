var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    timestamp: Number,
    userName: String,
    eventType: String,
    componentType: String,
    componentID: String,
    sessionID: String,
    workflow: String
});



module.exports = mongoose.model('UserEvent', eventSchema);
