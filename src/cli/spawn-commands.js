// adopted from: spawn-commands <https://github.com/jonschlinkert/spawn-commands>
// Copyright (c) 2014-2015, Jon Schlinkert.

'use strict'

var serial = require('../async/iterate').each
var concurrent = require('../async/concurrent').each
var forEach = require('../collection/forEach')
var extend = require('../object/extend')
var child = require('child_process')

// cmds: arrary/object of objects {cmd: 'something', args: ['some', 'things']}
// cb: callback [function]

function defs (opts) {
  opts = opts || {}

  return extend({
    stdio: 'inherit',
    concurrent: false
  }, opts)
}

function commands (cmds, opts, cb) {
  cmds = Array.isArray(cmds) ? cmds : [cmds]

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

  iterate(cmds, function (cmd, idx, next) {
    child.spawn(cmd.cmd, cmd.args, opts)
      .on('error', next)
      .on('close', next)
  }, cb)
}

commands.sync = function (cmds) {
  cmds = Array.isArray(cmds) ? cmds : [cmds]

  forEach(cmds, function (cmd) {
    child.spawnSync(cmd.cmd, cmd.args, opts)
  })
}

module.exports = commands
