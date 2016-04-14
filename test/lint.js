// test suite
function lintFile (dir, defs, next) {
  var painless = require('./assertion/painless')
  var test     = painless.createGroup(`Lint ${dir}/${defs.file}`)
  var t        = painless.assert

  // helpers
  var execfile = require('child_process').exec

  if (!defs.lint) next()

  // parameters
  var opts = {cwd: `../src/${dir}`}
  var filez = defs.file + '.js'
  var cmd = defs.fix ? `eslint --fix ${filez}` : `eslint ${filez}`

  // label each test
  function title (file) {
    return 'lint ' + file
  }

  test(title(filez), function (done) {
    execfile(cmd, opts, function (err, stdout, stderr) {
      if (err) {
        t.fail(stdout)
      }
      else t.pass('yes')

      process.nextTick(() => done())
    })
  })
}

module.exports = lintFile
