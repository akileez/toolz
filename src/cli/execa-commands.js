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
// cp: concurrent processing?. [boolean]
// cb: callback [function]

function commands(cmds, cp, cb) {
  if (arguments.length === 2) {
    cb = cp
    cp = false
  }

  var iterate = cp ? concurrent : serial

  iterate(cmds, function (cmd, idx, next) {
    var command =  cmd.cmd
    var args = cmd.args

    var opts = extend({
      maxBuffer: TEN_MEBIBYTE,
      preferLocal: false
    }, cmd.opts || {})

    if (opts.preferLocal) {
      opts.env = extend({}, opts.env || process.env)

      opts.env[pathKey] = npmRunPath({
        cwd: opts.cwd,
        path: opts.env[pathKey]
      })
    }

    child.execFile(command, args, opts, function (err, stdout, stderr) {
      if (err) console.log(err)
      if (stdout) console.log(stdout)
      if (stderr) console.log(stderr)
      next()
    })
  }, cb)
}

// this is crap right now. will fix soon.
commands.sync = function (cmds) {
  cmds = Array.isArray(cmds) ? cmds : [cmds]

  forEach(cmds, function (cmd) {
    var command = ['-c', cmd.cmd].concat(cmd.args)
    var opts = {}
    return module.exports([{cmd: '/bin/sh', args: command}], function () {

    })
    // child.execFileSync(command.join(' '), opts)
  })
}

module.exports = commands
