function forOwn (obj, fn, thisObj) {
  var key

  if (thisObj === undefined) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn(obj[key], key, obj)
      }
    }
  } else {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn.call(thisObj, obj[key], key, obj)
      }
    }
  }
}

module.exports = forOwn
