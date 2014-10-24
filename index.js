var pull = require('pull-core');
var pushable = require('pull-pushable');

/**
  # messenger-memory

  An in-memory messaging helper.

  Follows the [messenger-archetype](https://github.com/DamonOehlman/messenger-archetype)

**/
module.exports = function(opts) {
  var buffers = [];
  var broadcast = pull.Sink(function(read, source) {
    function next(end, data) {
      var targets;

      if (end) {
        return;
      }

      // write the data to each of the buffers that isn't us
      buffers.filter(function(buffer) {
        return buffer !== source;
      }).forEach(function(buffer) {
        buffer.push(data);
      });

      process.nextTick(function() {
        read(null, next);
      });
    }

    read(null, next);
  });

  return function(callback) {
    var source = pushable();

    buffers.push(source);
    callback(null, source, broadcast(source));
  };
};
