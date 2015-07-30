// async series collection
// lightweight serial async iterators:
// [each, reduce, map, filter, reject, detect, every, some, concat, times, series
// sequence(composite) and compose]
// adpoted from: https://github.com/aliaksandr-pasynkau/async-iterate

function asyncEachArray (arr, iterator, done) {
  if (!arr || !arr.length) return done()

  var lastIdx = arr.length
  var iterate = function (idx) {
    if (idx === lastIdx) return done()

    iterator(arr[idx], idx, function (err) {
      if (err) return done(err)

      iterate(++idx)
    })
  }
  iterate(0)
}

function asyncEach (obj, iterator, done) {
  if (Array.isArray(obj)) {
    asyncEachArray(obj, iterator, done)
    return
  }

  asyncEachArray(obj && Object.keys(obj), function (key, index, done) {
    iterator(obj[key], key, done)
  }, done)
}

function asyncReduce (obj, result, iterator, done) {
  asyncEach(obj, function (v, k, done) {
    iterator(result, v, k, function (err, value) {
      result = value
      done(err)
    })
  }, function (err) {
      done(err, result)
  })
}

function asyncMap (obj, iterator, done) {
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      resultObject.push(result)
      done(err, resultObject)
    })
  }, done)
}

function asyncFilter (obj, iterator, done) {
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (result) resultObject.push(obj[k])
      done(err, resultObject)
    })
  }, done)
}

function asyncReject (obj, iterator, done) {
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (!result) resultObject.push(obj[k])
      done(err, resultObject)
    })
  }, done)
}

function asyncDetect (obj, iterator, cb) {
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (result) {
        resultObject = obj[k]
        return cb(err, resultObject)
      }
      done(err, resultObject)
    })
  }, cb)
}

function asyncEvery (obj, iterator, done) {
  asyncReduce(obj, true, function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (!result) resultObject = false
      done(err, resultObject)
    })
  }, done)
}

function asyncSome (obj, iterator, done) {
  asyncReduce(obj, false, function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      if (result) resultObject = true
      done(err, resultObject)
    })
  }, done)
}

function asyncConcat (obj, iterator, done) {
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    iterator(v, k, function (err, result) {
      resultObject = resultObject.concat(result || [])
      done(err, resultObject)
    })
  }, done)
}

function asyncTimes (num, iterator, done) {
  var obj = Array(num)
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    iterator(num, function (err, res) {
      resultObject.push(res)
      done(null, resultObject)
    })
  }, done)
}

function asyncSeries (obj, done) {
  asyncReduce(obj, [], function (resultObject, v, k, done) {
    v.call(null, function (err, res) {
      resultObject.push(res)
      done(null, resultObject)
    })
  }, done)
}

function asyncSequence (/* functions ... */) {
  var fns = arguments
  return function () {
    var that = this
    var args = _baseSlice(arguments)
    var cb = args.slice(-1)[0]

    if (typeof cb === 'function') args.pop()
    else cb = function () {}

    asyncReduce(fns, args, function (resultObject, v, k, done) {
      v.apply(that, resultObject.concat([function () {
        var err = arguments[0]
        var nextargs = _baseSlice(arguments, 1)
        done(err, nextargs)
      }]))
    }, function (err, res) {
      cb.apply(that, [err].concat(res))
    })
  }
}

function asyncCompose (/* functions ... */) {
  return asyncSequence.apply(null, [].reverse.call(arguments))
}

function _baseSlice (arr, start) {
  start = start || 0
  var idx = -1
  var len = arr.length

  if (start) {
    len -= start
    len = len < 0 ? 0 : len
  }
  var result = Array(len)
  while (++idx < len) {
    result[idx] = arr[idx + start]
  }
  return result
}

exports.each      = asyncEach
exports.reduce    = asyncReduce
exports.map       = asyncMap
exports.filter    = asyncFilter
exports.reject    = asyncReject
exports.detect    = asyncDetect
exports.every     = asyncEvery
exports.some      = asyncSome
exports.concat    = asyncConcat
exports.times     = asyncTimes
exports.series    = asyncSeries
exports.composite = asyncSequence
exports.compose   = asyncCompose
