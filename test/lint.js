// test suite
function lintTestSingleFile (dir, defs) {
  var painless = require('./assertion/painless')
  var test     = painless.createGroup(`Lint ${dir}/${defs.file}`)
  var t        = painless.assert

  // helpers
  const spawn = require('child_process').spawn

  // parameters
  var opts = {cwd: `../src/${dir}`}
  var file = defs.file + '.js'
  var cmd  = 'eslint'

  // label test
  function title (file) {
    return 'lint ' + file
  }

  test(title(file), function (cb) {
    var cli = spawn(cmd, [file], opts)

    cli.stdout.on('data', (data) => {
      t.fail(`Test failed. Output suppressed.\n      run eslint separately --> eslint ${opts.cwd}/${file}`)
    })

    cli.stderr.on('data', (data) => {
      // t.pass()
    })

    cli.on('close', (code) => {
      t.pass()
      cb()
    })
  })
}

module.exports = lintTestSingleFile
