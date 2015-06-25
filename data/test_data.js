var _ = require('lodash');
var UserEvent = require('../models/UserEvent');
var secrets = require('../config/secrets');
var mongoose = require('mongoose');

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
      console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

// var done = _.after(2, process.exit());

console.log("start");
var e = new UserEvent({
    timestamp: 123455,
    userName: 'hack@turn.com',
    eventType: 'keystroke',
    componentType: 'table',
    componentID: 'segmentTable',
    sessionID: 'sid-13143',
    workflow: 'creativeEdit'
});
e.save(function(err) {
    if (err) {
        console.log("error");
        // done();
        return;
    }
    find(123455);
    console.log(e.timestamp, " saved");
    // done();
});

find = function(t) {
    UserEvent.findOne({
        timestamp: t,
        userName: 'hack@turn.com'},
        function(err, event1) {
            if (err) {
                console.log("err");
                // done();
                return;
            }
            console.log(event1.timestamp);
            // done();
        }
        );
}
