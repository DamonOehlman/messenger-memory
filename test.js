var pull = require('pull-stream');
var test = require('tape');

test('create a messenger pair', function(t) {
  var messenger = require('./index')();
  var expected = [ 'a', 'b', 'c', 'd' ];

  t.plan(expected.length + 2);

  messenger(function(err, source, sink) {
    t.ifError(err);
    pull(source, pull.drain(function(value) {
      t.equal(value, expected.shift());
    }));
  });

  messenger(function(err, source, sink) {
    t.ifError(err);
    pull(
      pull.values([].concat(expected)),
      sink
    );
  });
});

test('broadcast from a -> b, a, -> c', function(t) {
  var messenger = require('./index')();
  var values = [ 'a', 'b', 'c', 'd' ];

  function createReceiver(expected) {
    // take a copy
    expected = [].concat(expected);

    messenger(function(err, source, sink) {
      t.ifError(err);
      pull(source, pull.drain(function(value) {
        t.equal(value, expected.shift());
      }));
    });
  }

  t.plan((values.length + 1) * 2 + 1);

  createReceiver(values);
  createReceiver(values);

  messenger(function(err, source, sink) {
    t.ifError(err);
    pull(
      pull.values(values),
      sink
    );
  });
});
