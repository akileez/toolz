var wrappy = require('./wrappy')
var reqs = Object.create(null)
var once = require('./once')

// Add callbacks to requests in flight to avoid async duplication

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)
    var i = -1

    while (++i < len) {
      cbs[i].apply(null, args)
    }

    if (cbs.length > 1) {
      cbs.splice(0, len)
      process.nextTick(function () {
        RES.apply(null, args)
      })
    } else {
      delete reqs[key]
    }
  })
}

function slice (args) {
  var len = args.length
  var array = []
  var i = -1

  while (++i < len) array[i] = args[i]

  return array
}
