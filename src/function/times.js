// iterates over a callback a set amount of times

function times (n, fn, thisObj) {
  var i = -1
  while (++i < n) {
    if (fn.call(thisObj, i) === false) break
  }
}

module.exports = times
