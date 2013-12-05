var messenger = require('..');

function createMessenger() {
  return messenger();
}

function createDelayed() {
  return messenger({ delay: 200 });
}

require('messenger-tests')(createMessenger);
require('messenger-tests')(createDelayed);