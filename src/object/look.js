function look (obj, key) {
  if (!obj || !key) return

  var segs = key.split('.')

  while (segs.length) {
    obj = obj[segs.shift()]
    if (!obj) return
  }

  return obj
}

module.exports = look
