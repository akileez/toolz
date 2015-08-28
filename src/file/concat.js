var fs = require('fs')

function callback (err) {
  return function (err, data) {
    if (err) throw err
    console.log('This is a test of the callback functionality')
    // fs.writeFileSync(file, data)
  }
}

function concat (files, dest, cb) {
  // concatenate('*.txt', 'dest.txt', function () { ... })
  if (!Array.isArray(files)) files = [files]

  // concatenate(['*.js'], 'combined.js')
  if (cb === null || cb === undefined) cb = callback()

  fs.writeFile(dest, '', function (err) {
    if (err) cb(err)

    var done = false

    function loop (idx) {
      var file = files[idx]
      fs.readFile(file, function (err, data) {
        if (done) return
        if (err) {
          done = true
          return cb(err)
        }

        fs.appendFile(dest, data, function (err) {
          if (err) cb(err)
        })

        idx++

        if (!files[idx]) {
          done = true
          cb(null, 'done')
        } else {
          loop(idx)
        }
      })
    }

    loop(0)
  })
}

// synchronously concatenate files
// expects an array of file names. Put checks in later
function concatenate (files, dest) {
  var i = -1
  var len = files.length
  var combined = []

  while (++i < len) {
    combined.push(fs.readFileSync(files[i], 'utf8'))
  }

  // possible add option for join: ';\n' perhaps
  combined = combined.join('\n')

  if (dest) return fs.writeFileSync(dest, combined)

  return combined
}

module.exports = {
  async: concat,
  sync: concatenate
}
