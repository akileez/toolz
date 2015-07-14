var once = require('./once')
var helpers = require('./helpers')

function map (values, iterator, extensions, done) {
  // allow for extensions to not be specified
  if (typeof extensions === 'function') {
    done = extensions
    extensions = {}
  }

  // handle no callback case
  if (typeof done !== 'function') done = helpers.noop

  done = once(done)

  // will throw if non-object
  var keys = Object.keys(values)
  var len = keys.length
  var count = len
  var idx = -1
  // return the same type of passed in
  var results = helpers.initializeResults(values)
  var exts = helpers.defaultExtensions(extensions)

  while (++idx < len) {
    var key = keys[idx]
    next(key)
  }

  function next (key) {
    var value = values[key]
    var storage = exts.create(value, key) || {}

    exts.before(storage)
    iterator(value, once(handler))

    function handler (err, result) {
      if (err) {
        exts.error(err, storage)
        return done(err, results)
      }

      exts.after(result, storage)
      results[key] = result

      if (--count === 0) done(err, results)
    }
  }
}

function mapSeries (values, iterator, extensions, done) {
  // allow for extensions to not be specified
  if (typeof extensions === 'function') {
    done = extensions
    extensions = {}
  }

  // handle no callback case
  if (typeof done !== 'function') done = helpers.noop

  done = once(done)

  // will throw if non-object
  var keys = Object.keys(values)
  var len = keys.length
  var idx = 0
  // return the same type of passed in
  var results = helpers.initializeResults(values)
  var exts = helpers.defaultExtensions(extensions)


  var key = keys[idx]
  next(key)


  function next (key) {
    var value = values[key]
    var storage = exts.create(value, key) || {}

    exts.before(storage)
    iterator(value, once(handler))

    function handler (err, result) {
      if (err) {
        exts.error(err, storage)
        return done(err, results)
      }

      exts.after(result, storage)
      results[key] = result

      if (++idx >= len) done(err, results)
      else next(keys[idx])
    }
  }
}

module.exports = {
  map: map,
  mapSeries: mapSeries
}