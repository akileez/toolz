// lightweight limit async iterators:
// [each, reduce, map, filter, reject, detect, every, some, times, parallel]

function asyncEachArray (arr, limit, iterator, done) {
  if (!arr || !arr.length) return done()

  var len
  var lastIdx
  lastIdx = len = arr.length

  var running = 0
  var i = -1

  function next (err) {
    if (--len === -1) return once(done(null))

    while (running < limit && ++i < lastIdx) {
      running += 1
      iterator(arr[i], i, function (err) {
        running -= 1
        if (err) return once(done(err))
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

function asyncReduce (obj, limit, result, iterator, done) {
  asyncEach(obj, limit, function (v, k, done) {
    iterator(result, v, k, function (err, value) {
      result = value
      done(err)
    })
  }, function (err) {
      done(err, result)
  })
}

function asyncMap (obj, limit, iterator, done) {
  asyncReduce(obj, limit, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      resultObject.push(result)
      done(err, resultObject)
    })
  }, done)
}

function asyncFilter (obj, limit, iterator, done) {
  asyncReduce(obj, limit, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (result) resultObject.push(obj[k])
      done(err, resultObject)
    })
  }, done)
}

function asyncReject (obj, limit, iterator, done) {
  asyncReduce(obj, limit, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (!result) resultObject.push(obj[k])
      done(err, resultObject)
    })
  }, done)
}

function asyncDetect (obj, limit, iterator, cb) {
  asyncReduce(obj, limit, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (result) {
        resultObject = obj[k]
        return cb(err, resultObject)
      }
      done(err, resultObject)
    })
  }, cb)
}

function asyncEvery (obj, limit, iterator, done) {
  asyncReduce(obj, limit, true, function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (!result) resultObject = false
      done(err, resultObject)
    })
  }, done)
}

function asyncSome (obj, limit, iterator, done) {
  asyncReduce(obj, limit, false, function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (result) resultObject = true
      done(err, resultObject)
    })
  }, done)
}

function asyncTimes (num, limit, iterator, done) {
  var obj = Array(num)
  asyncReduce(obj, limit, [], function (resultObject, v, k, done) {
    iterator(num, function (err, res) {
      resultObject.push(res)
      done(null, resultObject)
    })
  }, done)
}

function asyncParallel (obj, limit, done) {
  asyncReduce(obj, limit, [], function (resultObject, v, k, done) {
    v(function (err, res) {
      resultObject.push(res)
      done(null, resultObject)
    })
  }, done)
}

function once (fn) {
  return function () {
    var ret = fn.apply(this, arguments)
    fn = noop
    return ret
  }
}

function noop () {}

exports.each     = asyncEach
exports.map      = asyncMap
exports.filter   = asyncFilter
exports.reject   = asyncReject
exports.detect   = asyncDetect
exports.every    = asyncEvery
exports.some     = asyncSome
exports.times    = asyncTimes
exports.parallel = asyncParallel
