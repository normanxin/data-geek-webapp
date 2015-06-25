var chai = require('chai');
var should = chai.should();
var tos = require('../analyzer/tos');
var UserEvent = require('../models/UserEvent');

describe('Tos Analyzer', function() {
  it('should pass', function(done) {
    var events = [new UserEvent({
            timestamp: 123455,
            userName: 'hack@turn.com',
            eventType: 'keystroke',
            componentType: 'table',
            componentID: 'segmentTable',
            sessionID: 'sid-13143',
            workflow: 'creativeEdit'
        }),
        new UserEvent({
            timestamp: 123435,
        userName: 'hack@turn.com',
        eventType: 'keystroke',
        componentType: 'table',
        componentID: 'segmentTable',
        sessionID: 'sid-13141',
        workflow: 'creativeEdit'
        }),
        new UserEvent({
            timestamp: 123415,
        userName: 'hack@turn.com',
        eventType: 'keystroke',
        componentType: 'table',
        componentID: 'segmentTable',
        sessionID: 'sid-13143',
        workflow: 'creativeEdit'
        }),
        new UserEvent({
            timestamp: 123455,
        userName: 'hack@turn.com',
        eventType: 'keystroke',
        componentType: 'table',
        componentID: 'segmentTable',
        sessionID: 'sid-13141',
        workflow: 'creativeEdit'
        })];
    var result = tos.analyzeTos(events);
    console.log(result);
    done();
  });

});
