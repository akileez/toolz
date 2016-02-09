exports.get = require('../object/get')
exports.set = require('../object/set')
exports.del = require('../object/unset')
exports.visit = require('../object/visit')
exports.toPath = require('../object/dotPath')
exports.define = require('../lang/defineProperty')
exports.cu = require('../lang/classUtils')
exports.run = function (obj, prop, arr) {
  var len = arr.length
  var i = 0
  while (len--) {
    obj[prop](arr[i++])
  }
}