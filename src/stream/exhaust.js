// https://github.com/chrisdickinson/stream-exhaust
// (MIT)

var Writable = require('stream').Writable;
var inherits = require('util').inherits;

/*

Ensure that the provided stream is flowing data, even if the stream hasn't been piped to another stream.

var exhaust = require('stream-exhaust');

exhaust(fs.createReadStream(__filename))
  .on('close', () => { console.log('all done, despite being streams{1+N}!') });

*/

module.exports = resumer;

function resumer(stream) {
  if (!stream.readable) {
    return stream;
  }

  if (stream._read) {
    stream.pipe(new Sink);
    return stream;
  }

  if (typeof stream.resume === 'function') {
    stream.resume();
    return stream;
  }

  return stream;
}

function Sink() {
  Writable.call(this, {
    objectMode: true
  });
}

inherits(Sink, Writable);

Sink.prototype._write = function(_, _, cb) {
  setImmediate(cb);
};
