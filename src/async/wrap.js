var rest = require('../function/rest')

// adopted from async.asyncify

function toAsync (fn) {
  return rest(function (args) {
    var callback = args.pop()
    var result

    try {
      result = fn.apply(this, args)
    } catch (err) {
      return callback(err)
    }

    // if result is Promise object ... not using Promise yet!
    // if (isObject(result) && typeof result.then === 'function') {
    //   result.then(function (value) {
    //     callback(null, value)
    //   }).catch(function (err) {
    //     callback(err.message ? err : new Error(err))
    //   })
    // } else {
    //   callback(null, result)
    // }

    callback(null, result)
  })
}

module.exports = toAsync
