// Not ready for human consumption.
var path = require('path')
var iterate = require('../async/iterate')

// create directory locator for reading in files via helper
function ftree (filenames, namespace, cb) {
  var parsed = {}
  var nsp = {}

  iterate.each(filenames, function (val, key, done) {
    var bname = path.basename(val, path.extname(val))

    parsed[bname] = val
    done(null, key)
  }, function (err, res) {
    nsp[namespace] = parsed
    // config.set(nsp)
    cb(null, nsp)
  })
}

// Generated a filepath object of static assets and attach to global data (`this`).
// helpers use this object for lookup, navigation and relative path calculation.
function buildFileTree (items, cb) {
  var items = {
    // glob of filenames and namespace for ftree
    templates : 'tmpls', // just for testing. remove later
    // modules   : '_',
    css       : 'css',
    js        : 'js',
    code      : 'code',
    ico       : 'ico',
    img       : 'img',
    pdf       : 'pdf'
  }

  iterate.each(items, function (val, key, done) {
    ftree(globby.sync(opts.get(key)), val, function (err, res) {
      config.set(res)
      done(null, key)
    })
  }, function (err, res) {
    assert.ifError(err)
    cb(null, 'ftree')
  })
}

module.exports = ftree
