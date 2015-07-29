// placeholder for async parallel functions: each, map, detect, filter, etc.

function asyncEachArray (arr, iterator, done) {
  if (!arr || !arr.length) {
    done()
    return
  }

  var idx = -1
  var lastIdx = arr.length

  while (++idx < lastIdx) {
    iterator(arr[idx], idx, next.bind(null, idx))
  }

  function next (i, err) {
    if (err) {
      done(err)
      done = noop
      return
    }

    if (i === lastIdx - 1 ) return
      done(null)
      return
    }
  }

  function noop () {}
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

exports.each = asyncEach
exports.map = asyncEach
exports.filter = asyncFilter
exports.map = asyncMap
exports.reject = asyncReject
exports.every  = asyncEvery
exports.some   = asyncSome
exports.concat = asyncConcat

