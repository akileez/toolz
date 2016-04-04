// adopted from underscore.string join

var slice = require('../array/slice')
var toString = require('../lang/toString')

function join (separator, args) {
  args = slice(arguments, 1)

  return args.join(toString(separator))
}

module.exports = join
