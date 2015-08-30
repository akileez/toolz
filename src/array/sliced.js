// need to test this with no args and other ways.
// https://github.com/aheckmann/sliced
// an Array.prototype.slice.call(arguments) alternative

function sliced (args, slice, sliceEnd) {
  var res = []
  var len = args.length

  if (len === 0) return res

  var strt = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > strt) {
    res[len - strt] = args[len]
  }
  return res
}

module.exports = sliced
