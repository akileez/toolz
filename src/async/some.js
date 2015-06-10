var eachOf = require('./eachOf')

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