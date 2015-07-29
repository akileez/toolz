// async series collection
// lightweight async iterators (map, each, reduce, filter, reject)
// adpoted from: https://github.com/aliaksandr-pasynkau/async-iterate

var keys    = require('../object/keys')
var isArray = require('../lang/isArray')

function asyncEachArray (arr, iterator, done) {
  if (!arr || !arr.length) {
    done()
    return
  }

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
  if (isArray(obj)) {
    asyncEachArray(obj, iterator, done)
    return
  }

  asyncEachArray(obj && keys(obj), function (key, index, done) {
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

exports.map    = asyncMap
exports.each   = asyncEach
exports.reduce = asyncReduce
exports.filter = asyncFilter
exports.reject = asyncReject
exports.every  = asyncEvery
exports.some   = asyncSome
exports.concat = asyncConcat
