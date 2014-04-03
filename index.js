/* jshint node: true */
'use strict';

var EventEmitter = require('events').EventEmitter;
var defaultScope = [];

/**
  # messenger-memory

  Simple in-memory messenger

**/
module.exports = function(opts) {
  // create a new event emitter
  var customScope = (opts || {}).scope;
  var emitter = new EventEmitter();
  var scope = Array.isArray(customScope) ? customScope : defaultScope;

  function send(target, msg) {
    setTimeout(function() {
      target.emit('data', msg);
    }, (opts || {}).delay || 0);
  }

  // monkey patch a send method into the emitter
  emitter.send = emitter.write = function(msg) {
    for (var ii = scope.length; ii--; ) {
      if (scope[ii] !== emitter) {
        send(scope[ii], msg);
      }
    }
  };

  // monkey patch a close method
  emitter.close = function() {
    var index = scope.indexOf(emitter);

    // remove all listeners
    emitter.removeAllListeners();
    if (index >= 0) {
      scope.splice(index, 1);
    }
  };

  // set the connected property to true
  emitter.connected = true;

  // add the emitter to the scope
  scope.push(emitter);

  // return the messenger
  return emitter;
}