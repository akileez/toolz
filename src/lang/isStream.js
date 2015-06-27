function isSteam (val) {
  return val !== null && typeof val === 'object' && typeof val.pipe === 'function'
}

function isStreamWritable (val) {
  return isStream(val)
    && val.writable !== false
    && typeof val._write == 'function'
    && typeof val._writableState == 'object';
};

function isStreamReadable (val) {
  return isStream(val)
    && val.readable !== false
    && typeof val._read == 'function'
    && typeof val._readableState == 'object';
};

function isStreamDuplex (val) {
  return isStream.writable(val) && isStream.readable(val);
};

exports.isStream = isStream
exports.isStreamReadable = isStreamReadable
exports.isStreamWritable = isStreamWritable
exports.isStreamDuplex = isStreamDuplex
