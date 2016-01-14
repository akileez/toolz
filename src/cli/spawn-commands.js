// adopted from: spawn-commands <https://github.com/jonschlinkert/spawn-commands>
// Copyright (c) 2014-2015, Jon Schlinkert.

'use strict'

var iterate = require('../async/iterate').each
var forEach = require('../collection/forEach')
var child = require('child_process')

// cmds: arrary/object of objects {cmd: 'something', args: ['some', 'things']}
// cb: callback [function]

function commands(cmds, cb) {
  if (arguments.length === 1) cb = function () {}

  iterate(cmds, function (cmd, idx, next) {
    child.spawn(cmd.cmd, cmd.args, {stdio: 'inherit'})
      .on('error', next)
      .on('close', next)
  }, cb)
}

commands.sync = function (cmds) {
  cmds = Array.isArray(cmds) ? cmds : [cmds]

  forEach(cmds, function (cmd) {
    child.spawnSync(cmd.cmd, cmd.args, {stdio: 'inherit'})
  })
}

module.exports = commands
