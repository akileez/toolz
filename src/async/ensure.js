var rest = require('../function/rest')

function ensureAsync (fn) {
  return rest(function(args) {
    var callback = args.pop()

    args.push(function () {
      var innerArgs = arguments
      if (sync) {
        process.nextTick(function () {
          callback.apply(null, innerArgs)
        })
      } else callback.apply(null, innerArgs)
    })
    var sync = true
    fn.apply(this, args)
    sync = false
  })
}

module.exports = ensureAsync
