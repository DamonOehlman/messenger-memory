/* jshint node: true */
'use strict';

var EventEmitter = require('events').EventEmitter;
var defaultScope = [];

/**
  # messenger-memory

  Simple in-memory messenger

**/
module.exports = function(customScope) {
  // create a new event emitter
  var emitter = new EventEmitter();
  var scope = Array.isArray(customScope) ? customScope : defaultScope;

  // monkey patch a send method into the emitter
  emitter.send = function(msg) {
    for (var ii = scope.length; ii--; ) {
      if (scope[ii] !== emitter) {
        scope[ii].emit('data', msg);
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

  // add the emitter to the scope
  scope.push(emitter);

  // return the messenger
  return emitter;
}