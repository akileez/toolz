
##### code listing
```javascript
function times (num, iterator, callback) {
  var i = 0
  var results = []

  function done (err, res) {
    results[i] = res
    i++

    if (err) return callback(err, results)
    if (i === num) return callback(err, results)

    iter()
  }

  function iter () {
    iterator(i, done)
  }

  iter()
}
```
##### example
```javascript
var times = require('toolz/src/async/serial-times')

times(5, function (n, done) {
  console.log('Hello World')
  done(null, n)
}, function (err, res) {
  assert.ifError(err)
  console.log('Done', res[4]+1, 'times')
})
```
##### better example
```javascript
function crushpng (num, cb) {
  if (!isNumber(num)) num = 1

  logger.info('Starting pngquant ... crushing png images')

  var cmd = ['pngquant -f --ext .png --speed 1 --quality 70-95 *.png']

  times(num, function (n, done) {
    exec(cmd, {cwd: 'build/assets/img'}, function (err, stdout) {
      assert.ifError(err)
      logger.info('pngquant', 'run done')
      done(null, n)
    })
  }, function (err, res) {
    assert.ifError(err)
    logger.done('pngquant process completed ' + num + ' times.')
    cb(null, 'crushpng')
  })
}
```