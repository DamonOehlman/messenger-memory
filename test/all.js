var messenger = require('..');
var scope = [];

function createMessenger() {
  return messenger({ scope: scope });
}

function createDelayed() {
  return messenger({ delay: 200, scope: scope });
}

function createRandomDelay() {
  return messenger({ scope: scope, delay: function() {
    return Math.random() * 500;
  }});
}

require('messenger-tests')(createMessenger);

// reset and run the delay tests
scope = []; require('messenger-tests')(createDelayed);

// reset and run the random delay tests
scope = []; require('messenger-tests')(createRandomDelay);
