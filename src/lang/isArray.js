/*
  Note to self:
  function (a) {
    return typeof a === 'object' && !!a.length
  }

*/

function isArray (value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

/* istanbul ignore next */
module.exports = Array.isArray || isArray
module.exports.isArr = isArray
