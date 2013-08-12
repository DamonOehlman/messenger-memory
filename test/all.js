var messenger = require('..');

function createMessenger() {
  return messenger();
}

require('messenger-tests')(createMessenger);