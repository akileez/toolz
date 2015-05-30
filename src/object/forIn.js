function forIn (obj, fn, thisObj) {
  var key
  for (key in obj) {
    if (fn.call(thisObj, obj[key], key, obj) === false) break
  }
}

module.exports = forIn
