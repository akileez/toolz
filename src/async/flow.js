// placeholder for async control flow functions: series, parallel, etc.

// from https://github.com/mmaelzer/weachy
function waterfall (objs, done) {
  var idx = 0

  function next (err, vargs) {
    if (err || idx === objs.length)
      return done.apply(null, arguments)

    var args = arguments.length === 0
      ? [next]
      : [].slice.call(arguments, 1).concat(next)

    objs[idx++].apply(null, args)
  }
  next()
}

function until (test, iterator, done) {
  if (!test) {
    iterator(function (err) {
      if (err) return done(err)
      until(test, iterator, done)
    })
  } else done(null)
}

function doUntil (iterator, test, done) {
  iterator (function (err) {
    if (err) return done(err)

    var args = [].slice.call(arguments, 1)
    if (!test.apply(null, args)) doUntil(iterator, test, done)
    else done(null)
  })
}

function whilst (test, iterator, callback) {
  if (test) {
    iterator(function (err) {
      if (err) return callback(err)
      whilst(test, iterator, callback)
    })
  } else callback(null)
}

function doWhilst (iterator, test, callback) {
  iterator(function (err) {
    if (err) return callback(err)
    var args = [].slice.call(arguments, 1)
    if (test.apply(null, args)) doWhilst(iterator, test, callback)
    else callback(null)
  })
}

exports.falls = waterfall
exports.until = until
exports.doUntil = doUntil
exports.whilst = whilst
exports.doWhilst = doWhilst
