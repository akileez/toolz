// adopted from: spawn-commands <https://github.com/jonschlinkert/spawn-commands>
// Copyright (c) 2014-2015, Jon Schlinkert.

'use strict'

var serial = require('../async/iterate').each
var concurrent = require('../async/concurrent').each
var forEach = require('../collection/forEach')
var child = require('child_process')

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


    child.spawn(command, args, {stdio: 'inherit'})
      .on('error', next)
      .on('close', next)
  }, cb)
}

commands.sync = function (cmds) {
  cmds = Array.isArray(cmds) ? cmds : [cmds]

  forEach(cmds, function (cmd) {
    var command = cmd.cmd
    var args = cmd.args
    child.spawnSync(command, args, {
      stdio: 'inherit'
    })
  })
}

module.exports = commands
