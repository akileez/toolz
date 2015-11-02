// from: sliced <https://github.com/aheckmann/sliced>
// Copyright (c) 2012 [Aaron Heckmann](aaron.heckmann+github@gmail.com)

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
