var serial = require('../async/iterate').each
var concurrent = require('../async/concurrent').each
var forEach = require('../collection/forEach')
var child = require('child_process')
var extend = require('../object/extend')

var TEN_MEBIBYTE = 1024 * 1024 * 10

function commands(cmds, opts, cb) {
  function defs(opts) {
    opts = opts || {}
    return {
      maxBuffer: TEN_MEBIBYTE,
      env: process.env,
      encoding: opts.encoding || 'utf8',
      cp: opts.cp || false
    }
  }

  if (arguments.length === 2) {
    cb = opts
    opts = defs()
  } else {
    opts = defs(opts)
  }

  var iterate = opts.cp ? concurrent : serial

  iterate(cmds, function (cmd, idx, next) {
    var command =  cmd

    // this needs to be cleaned up. maybe returned as a result object
    child.exec(cmd, opts, function(err, stderr, stdout) {
      if (err) console.log(err)
      if (stdout) console.log(stdout)
      if (stderr) console.log(stderr)
      next()
    })
  }, cb)
}

commands.sync = function (cmds, opts) {
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
