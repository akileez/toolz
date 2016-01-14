var serial = require('../async/iterate').each
var concurrent = require('../async/concurrent').each
var forEach = require('../collection/forEach')
var child = require('child_process')

var TEN_MEBIBYTE = 1024 * 1024 * 10

function commands(cmds, opts, cb) {
  function defs(opts) {
    opts = opts || {}
    return {
      maxBuffer: TEN_MEBIBYTE,
      env: process.env,
      encoding: opts.encoding || 'utf8',
      concurrent: opts.concurrent || false
    }
  }

  if (arguments.length === 2) {
    cb = opts
    opts = defs()
  } else {
    opts = defs(opts)
  }

  var iterate = opts.concurrent ? concurrent : serial

  iterate(cmds, function (cmd, idx, next) {
    child.exec(cmd, opts, function(err, stdout, stderr) {
      if (err) process.stderr.write('\u001b[31m' + err.toString() + '\u001b[39m')
      if (stdout) process.stdout.write(stdout)
      if (stderr) process.stdout.write(stderr)
      next()
    })
  }, cb)
}

commands.sync = function (cmds, opts) {
  // object and string to be delt with (visit pattern?)
  cmds = Array.isArray(cmds) ? cmds : [cmds]

  forEach(cmds, function (cmd) {
    opts = {
      maxBuffer: TEN_MEBIBYTE,
      env: process.env,
      encoding: 'utf8',
      stdio: 'inherit'
    }

    child.execSync(cmd, opts)
  })
}

module.exports = commands
