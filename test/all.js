var messenger = require('..');

function createMessenger() {
  return messenger();
}

function createDelayed() {
  return messenger({ delay: 200 });
}

function createRandomDelay() {
  return messenger({ delay: function() {
    return Math.random() * 500;
  }});
}

require('messenger-tests')(createMessenger);
require('messenger-tests')(createDelayed);
require('messenger-tests')(createRandomDelay);
