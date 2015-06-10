function parallel (tasks, callback) {
  callback = callback || noop
  var results = isArrayLike(tasks) ? [] : {}

  eachOf(tasks, function (task, key, callback) {
    task(function (err) {
      var args = _baseSlice(arguments, 1)
      if (args.length <= 1) args = args[0]

      results[key] = args
      callback(err)
    })
  }, function (err) {
    callback(err, results)
  })
}