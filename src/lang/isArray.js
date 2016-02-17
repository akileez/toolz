/*
  Note to self:
  function (a) {
    return typeof a === 'object' && !!a.length
  }

*/

function isArray (value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

module.exports = Array.isArray || isArray
