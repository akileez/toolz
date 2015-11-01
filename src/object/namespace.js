// create nested object if non-existent

function namespace (obj, path) {
  if (!path) return obj
  var segs = toSegments(path)

  var i = -1
  var len = segs.length

  while (++i < len) {
    if (!obj[segs[i]]) obj[segs[i]] = {}
    obj = obj[segs[i]]
  }

  return obj
}

function toSegments (val) {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return val.split('.')
}

module.exports = namespace
