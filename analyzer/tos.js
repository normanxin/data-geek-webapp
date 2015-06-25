var UserEvent = require('../models/UserEvent');

/**
 * events - array of UserEvent
 */
exports.analyzeTos = function(events) {
    var sids = {};
    for (var i = 0, len = events.length; i < len; i++) {
        var event = events[i];
        var asid = {};
        if (event.sessionID in sids) {
            asid = sids[event.sessionID];
        };
        if (!asid.hasOwnProperty('minTs') || asid.minTs > event.timestamp) {
            asid.minTs = event.timestamp;
        }
        if (!asid.hasOwnProperty('maxTs') || asid.maxTs < event.timestamp) {
            asid.maxTs = event.timestamp;
        }
        asid.sessionID = event.sessionID;
        asid.userName = event.userName;
        asid.componentID = event.componentID;
        asid.componentType = event.componentType;
        asid.workflow = event.workflow;
        asid.eventType = event.eventType;
        sids[event.sessionID] = asid;
    }

    var r = [];
    for (var key in sids) {
        var event = sids[key];
        if (!event.hasOwnProperty('maxTs') || !event.hasOwnProperty('minTs')) {
            continue;
        }
        event.tos = event.maxTs - event.minTs;
        r.push(event);
    }

    return r;
}
