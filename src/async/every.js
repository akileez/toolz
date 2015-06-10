var eachOf = require('./eachOf')

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