var eachOf = require('./eachOf')
var noop = require('../base/noop')

function some (arr, iterator, main_callback) {
  eachOf(arr, function (x, _, callback) {
    iterator(x, function (v) {
      if (v) {
        main_callback(true)
        main_callback = noop
      }
      callback()
    })
  }, function () {
    main_callback(false)
  })
}

function every (arr, iterator, main_callback) {
  eachOf(arr, function (x, _, callback) {
    iterator(x, function (v) {
      if (!v) {
        main_callback(false)
        main_callback = noop
      }
      callback()
    })
  }, function () {
    main_callback(true)
  })
}

exports.some = some
exports.every = every
