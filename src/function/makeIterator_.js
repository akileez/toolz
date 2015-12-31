var identity = require('./identity')
var prop = require('./prop')
var deepMatches = require('../object/deepMatches')

function makeIterator (src, thisObj) {
  if (src == null) return identity

  var source = typeof src

  var iterate = {
    'function' : function () {
      return (typeof thisObj !== 'undefined')
        ? function (value, idx, arr) {
            return src.call(thisObj, value, idx, arr)
          }
        : src
      },

    'object' : function () {
      return function (value) {
        return deepMatches(value, src)
      }
    },

    defaults : function () {
      // handles strings and numbers
      return prop(src)
    }
  }

  return (typeof iterate[source] !== 'function')
    ? iterate.defaults()
    : iterate[source]()
}

module.exports = makeIterator
