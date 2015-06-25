var UserEvent = require('../models/UserEvent');

var empty = JSON.parse('{\"events\" : []}');
var error= JSON.parse('{"events" : [], "status" : "ERROR"}');

exports.getEvents = function(req, res) {
    res.setHeader('content-type', 'application/json');
    var q;
    try {
        q= JSON.parse(req.query.q);
    } catch (e) {
        return res.json(error);
    }
    console.log(q);
    return find(q, res);

};

exports.postEvents = function(req, res) {
    res.setHeader('content-type', 'application/json');
    return find(q, res);
};

find = function(q, res) {
    if (q) {
        UserEvent.find(q).exec(function(err, events) {
            if (err) {
                console.log(err);
                return res.json(error);
            } else {
                return res.json(events);
            }
        });
    } else {
        return res.json(error);
    }
}
