// placeholder for async limit functions

function asyncEachArray (arr, limit, iterator, done) {
  if (!arr || !arr.length) return done()

  var len
  var lastIdx
  lastIdx = len = arr.length

  var running = 0
  var started = -1

  function next (err) {
    if (err) return once(done(err))
    if (--len === 0) return done(null)

    while (running < limit && ++started < lastIdx) {
      running += 1
      iterator(arr[started], started, function (err) {
        running -= 1
        if (err) done(err)
        else next()
      })
    }
  }

  next()
}

function asyncEach (obj, limit, iterator, done) {
  if (Array.isArray(obj)) {
    asyncEachArray(obj, limit, iterator, done)
    return
  }

  asyncEachArray(obj && Object.keys(obj), limit, function (key, index, done) {
    iterator(obj[key], key, done)
  }, done)
}

exports.each = asyncEach