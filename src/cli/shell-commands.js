var serial = require('../async/iterate').each
var forEach = require('../collection/forEach')
var concurrent = require('../async/concurrent').each
var child = require('child_process')

var TEN_MEBIBYTE = 1024 * 1024 * 10

function noop () {}

function defs (opts) {
  opts = opts || {}

  return {
    maxBuffer: TEN_MEBIBYTE,
    env: process.env,
    stdio: 'inherit',
    encoding: opts.encoding || 'utf8',
    concurrent: opts.concurrent || false
  }
}

function commands (cmds, opts, cb) {
  cmds = Array.isArray(cmds) ? cmds : [cmds]

  if (arguments.length === 1) {
    cb = noop
    opts = defs()
  } else if (arguments.length === 2) {
    if (typeof opts === 'function') {
      cb = opts
      opts = defs()
    } else {
      cb = noop
      opts = defs(opts)
    }
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
  if (typeof cmds === 'string') cmds = [cmds]

  forEach(cmds, function (cmd) {
    child.execSync(cmd, defs(opts))
  })

  // serial(cmds, function (cmd, idx, next) {
  //   child.execSync(cmd, defs(opts))
  //   next()
  // }, noop)
}

module.exports = commands
