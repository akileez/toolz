// test suite
var painless = require('../assertion/painless')
var test     = painless.createGroup('Lint array collection')
var t        = painless.assert

// helpers
var execfile = require('child_process').execFile
var concur   = require('../../src/async/concurrent').each
var glob     = require('../../src/glob/globby')
var map      = require('../../src/array/map')
var segments = require('../../src/path/segments')

// parameters
var opts = {cwd: '../src/array'}
var files = map(glob.sync('../src/array/*.js'), function (v, k) {
  return segments.last(v)
})

// label each test
function title (file) {
  return 'lint ' + file
}

// console.log(files)

concur(files, (file, idx, next) => {
  test(title(file), function (cb) {
    execfile('eslint', [file], opts, function (err, stdout, stderr) {
      if (err) {
        t.fail(stdout)
      }
      else t.pass('yes')
      cb()
    })
  })
}, () => {
  // nothing here
})
