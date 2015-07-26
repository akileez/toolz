
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