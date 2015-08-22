// adopted from https://github.com/jonschlinkert/fs-utils
// Copyright (c) 2014 Jon Schlinkert, Brian Woodward. (MIT)

var separator = '/'

// return an array of path segments
function segments (fp) {
  return fp.split(/[\/]/g)
}

// the last `num` segments of a filepath. If a number
// isn't passed for `num`, the last segment is returned
function last (fp, num, opt) {
  return segments(fp)
    .slice(-(num || 1))
    .join(opt || separator)
}

// the last `num` segments removed from a filepath. If a number
// isn't passed for `num`, the last segment is removed.
function fromLast (fp, num, opt) {
  return segments(fp)
    .slice(0, -(num || 1))
    .join(opt || separator)
}

// the first `num` segments of a filepath. If a number
// isn't passed for `num`, the first segment is returned
function first (fp, num, opt) {
  return segments(fp)
    .slice(0, num || 1)
    .join(opt || separator)
}

// the first `num` segments removed from a filepath. If a number
// isn't passed for `num`, the first segment is removed.
function fromFirst (fp, num, opt) {
  return segments(fp)
    .slice(num || 1)
    .join(opt || separator)
}

module.exports = segments
module.exports.last = last
module.exports.fromLast = fromLast
module.exports.first = first
module.exports.fromFirst = fromFirst
