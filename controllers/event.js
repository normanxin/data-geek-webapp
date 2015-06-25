module.exports = {
  getEvents: function(req, res) {
    res.json(require('../data/consoleMock'));
  }
};
