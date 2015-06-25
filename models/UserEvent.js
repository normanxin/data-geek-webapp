var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://192.168.59.103:27017/test');

var eventSchema2 = new mongoose.Schema({
    eventID: Number,
    userName: String,
    eventType: String,
    UIComponentType: String,
    UIComponentID: Number,
    sessionID: Number,
    workflowID: Number,
    WorkflowName: String,
    activityOccurTime: Number, 
    activityOccurDate: Date,
    activityEndTime: Number,
    activityEndDate: Date,
    windowTabOnFocus: Boolean
});

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
