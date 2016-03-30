function forIn (obj, fn, ctx) {
  var key

  if (!ctx) {
    for (key in obj) {
      if (fn(obj[key], key, obj) === false) break
    }
  } else {
    for (key in obj) {
      if (fn.call(ctx, obj[key], key, obj) === false) break
    }
  }
}

module.exports = forIn
