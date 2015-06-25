var UserEvent = require('../models/UserEvent');

var empty = JSON.parse('{"events" : []}');
var error= JSON.parse('{"events" : [], "status" : "ERROR"}');
var saveError= JSON.parse('{"status" : "ERROR"}');
var saveSuc = JSON.parse('{"status" : "OK"}');

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
    return find(req.q, res);
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

exports.saveEvents = function(req, res) {
    res.setHeader('content-type', 'application/json');
    if (req.q) {
        var event = new UserEvent({
            timestamp: req.q.timestamp,
            userName: req.q.userName,
            eventType: req.q.eventType,
            componentType: req.q.componentType,
            componentID: req.q.componentID,
            sessionID: req.q.sessionID,
            workflow: req.q.workflow
        });
        event.save(function(err) {
            if (err) return res.json(saveError);
            return res.json(saveSuc);
        });
    }
    return res.json(saveError);
}
