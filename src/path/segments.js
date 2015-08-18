// adopted from https://github.com/jonschlinkert/fs-utils
// Copyright (c) 2014 Jon Schlinkert, Brian Woodward. (MIT)

var separator = '/'

// return an array of path segments
function segments (fp) {
  return fp.split(/[\/]/g)
}

// the last `num` segments of a filepath. If a number
// isn't passed for `num`, the last segment is returned
function last (fp, num) {
  var seg = segments(fp)
  return seg.slice(-(num || 1)).join(separator)
}

// the last `num` segments removed from a filepath. If a number
// isn't passed for `num`, the last segment is removed.
function fromLast (fp, num) {
  var seg = segments(fp)
  return seg.slice(0, -(num || 1)).join(separator)
}

// the first `num` segments of a filepath. If a number
// isn't passed for `num`, the first segment is returned
function first (fp, num) {
  var seg = segments(fp)
  return seg.slice(0, num || 1).join(separator)
}

// the first `num` segments removed from a filepath. If a number
// isn't passed for `num`, the first segment is removed.
function fromFirst (fp, num) {
  var seg = segments(fp)
  return seg.slice(num || 1).join(separator)
}

exports.last = last
exports.fromLast = fromLast
exports.first = first
exports.fromFirst = fromFirst
