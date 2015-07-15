// "author": "Hugh Kennedy <hughskennedy@gmail.com> (http://hughskennedy.com/)"
// https://github.com/hughsk/async-series (MIT)

var nextTick = 'undefined' !== typeof process
  ? process.nextTick
  : 'undefined' !== typeof setImmediate
    ? setImmediate
    : setTimeout

function series (arr, ready, safe) {
  var len = arr.length
  var orig

  if (!len) return nextTick(ready, 1)

  function handleItem(idx) {
    arr[idx](function (err) {
      if (err) return ready(err)
      if (idx < len - 1) return handleItem(++idx)
      return ready()
    })
  }

  if (safe) {
    orig = handleItem
    handleItem = function (idx) {
      nextTick(function () {
        orig(idx)
      }, 1)
    }
  }

  handleItem(0)
}

module.exports = series
