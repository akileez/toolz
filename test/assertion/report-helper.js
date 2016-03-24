var through = require('../stream/through'); // through2

function reporterHelper(eventObj) {
  return function(stream) {
    var result;
    var output = through();

    stream.on('data', function onData(info) {
      if (eventObj[info.type]) {
        result = eventObj[info.type](info.data);
        output.queue(result);
      }
    });

    return output;
  }
}

module.exports = reporterHelper;