var chai = require('chai');
var should = chai.should();
var User = require('../models/User');
var UserEvent = require('../models/UserEvent');

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    })
  });

  it('should not create a user with the unique email', function(done) {
    var user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find user by email', function(done) {
    User.findOne({ email: 'test@gmail.com' }, function(err, user) {
      if (err) return done(err);
      user.email.should.equal('test@gmail.com');
      done();
    });
  });

  it('should delete a user', function(done) {
    User.remove({ email: 'test@gmail.com' }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});

describe('UserEvent Model', function() {
    it('should create a user event', function(done) {
        var event = new UserEvent({
            timestamp: 123455,
            userName: 'hack@turn.com',
            eventType: 'keystroke',
            componentType: 'table',
            componentID: 'segmentTable',
            sessionID: 'sid-13143',
            workflow: 'creativeEdit'
        });
        event.save(function(err) {
            if (err) return done(err);
            done();
        });
    });

    it('should find an event', function(done) {
        UserEvent.findOne({
            timestamp: 123455,
            userName: 'hack@turn.com'},
            function(err, event) {
                if (err) return done(err);
                event.timestamp.should.equal(123455);
                done();
            }
        ); 
    });

    it('should delete a event', function(done) {
        UserEvent.remove({
            timestamp: 123455,
            userName: 'hack@turn.com'},
            function(err, event) {
                if (err) return done(err);
                done();
            }
        ); 
    });
});
