
##### code listing
code was refactored. still deciding how to handle.

##### example
```javascript
var times = require('toolz/src/async/iterator').times

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

# calling the code
crush.png(3, function () {
  logger.done('All Done.')
})
```

##### command line output
```bash
> rendr crush --png 3

Saturday, August 1st, 2015 06:19:22 GMT-0400

---------------------------------------
  BUILD_ENV   :  development
  BUILD_STAGE :  dev
  RUNNING_JOB :  crush
---------------------------------------

06:19:22:856 - Info Starting pngquant ... crushing png images
06:19:24:342 - Info pngquant run done
06:19:24:615 - Info pngquant run done
06:19:24:839 - Info pngquant run done
06:19:24:840 - Done  pngquant process completed 3 times.
06:19:24:840 - Done  All Done.
```