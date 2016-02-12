// humanize-number (MIT)

/*
  Humanize a number `1000000.99` -> `1,000,000.99`

    var humanize = require('humanize-number');

    humanize(1000);
    // => '1,000'

    humanize(1000.55, { delimiter: '.', separator: ',' });
    // => '1.000,55'
*/

function humanize (n, options) {
  options = options || {}
  var d = options.delimiter || ','
  var s = options.separator || '.'
  n = n.toString().split('.')
  n[0] = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + d)
  return n.join(s)
}

module.exports = humanize
