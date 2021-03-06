// insirped by: https://github.com/sindresorhus/execa
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

var serial = require('../async/iterate').each
var concurrent = require('../async/concurrent').each
var forEach = require('../collection/forEach')
var child = require('child_process')
var extend = require('../object/extend')
var pathKey = require('../path/path-key')
var npmRunPath = require('../path/npm-run-path')

var TEN_MEBIBYTE = 1024 * 1024 * 10

// cmds: arrary/object of objects {cmd: 'something', args: ['some', 'things']}
// opts: options object
// cb: callback [function]
function defs (opts) {
  opts = opts || {}

  if (opts.preferLocal) {
    opts.env = extend({}, opts.env || process.env)

    opts.env[pathKey] = npmRunPath({
      cwd: opts.cwd,
      path: opts.env[pathKey]
    })
  }
  return extend({
    maxBuffer: TEN_MEBIBYTE,
    preferLocal: false,
    stdio: 'inherit',
    concurrent: false
  }, opts)
}

function commands (cmds, opts, cb) {
  if (arguments.length === 1) {
    cb = function () {}
    opts = defs()
  } else if (arguments.length === 2) {
    if (typeof opts === 'function') {
      cb = opts
      opts = defs()
    } else {
      cb = function () {}
      opts = defs(opts)
    }
  } else {
    opts = defs(opts)
  }

  var iterate = opts.concurrent ? concurrent : serial

  // this may be converted to a Promise-like function
  iterate(cmds, function (cmd, idx, next) {
    child.execFile(cmd.cmd, cmd.args, opts, function (err, stdout, stderr) {
      if (err) process.stderr.write('\u001b[31m' + err.message + '\u001b[39m')
      if (stdout) process.stdout.write(stdout)
      if (stderr) process.stdout.write(stderr)
      next()
    })
  }, cb)
}

// need to deal with objects and strings (visit pattern?)
commands.sync = function (cmds, opts) {
  cmds = Array.isArray(cmds) ? cmds : [cmds]

  forEach(cmds, function (cmd) {
    child.execFileSync(cmd.cmd, cmd.args, defs(opts))
  })
}

module.exports = commands
