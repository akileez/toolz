// **Github:** https://github.com/teambition/ilog
//
// **License:** MIT
'use strict'

const format = require('util').format
const jlog = require('../util/jcolorz')
const ccase = require('../string/sentenceCase')
const slice = require('../array/slice')

const levels = [
  'FATAL',    // level 0
  'CRITICAL', // level 1
  'ERROR',    // level 2
  'WARNING',  // level 3
  'ALERT',    // level 4
  'NOTICE',   // level 5
  'INFO',     // level 6
  'DEBUG'     // level 7
  ]

function ilog () {
  if (arguments.length) {
    ilog._stdout.write(ilog._assembleLog(format.apply(null, arguments)))
  }
}

ilog.display = true
ilog.level = 7
ilog.levels = levels.slice()

// ilog.fatal, ilog.critical, ilog.error, ilog.warning, ilog.alert
levels.slice(0, 5).map((level, index) => {
  ilog[level.toLowerCase()] = function (error, stack) {
    if (error != null && index <= ilog.level) {
      // allow the ability to pass a debugging message of this level
      if (typeof error === 'string') error = {message: error}
      if (stack) error.stack = ilog._errorify(stack)

      error.name = ccase(level)

      if (ilog.display) {
        // reformatting output for jcolorz
        // error = ilog._stringify(ilog._errorify(error))
        error = ilog._errorify(error)

        ilog._stderr.write(ilog._assembleLog(error.message, level, ilog._time(new Date())))
        jlog(error)
      }

      else {
        error = ilog._stringify(ilog._errorify(error))
        ilog._stderr.write(ilog._assembleLog(error, level, ilog._time(new Date())))
      }
    }
  }
})

// ilog.notice, ilog.info
levels.slice(5, 7).map((level, index) => {
  index += 5
  ilog[level.toLowerCase()] = function (message) {
    if (message != null && index <= ilog.level) {
      message = ilog._stringify(message)
      ilog._stdout.write(ilog._assembleLog(message, level, ilog._time(new Date())))
    }
  }
})

ilog.debug = function () {
  // ilog.level === -1 turns off all levels
  // ilog.level === -2 turns on debug logging
  if (arguments.length && (ilog.level >= 7 || ilog.level === -2)) {
    let messages

    if (arguments.length === 1) {
      messages = ilog._stringify(arguments[0])
    }

    else if (arguments.length === 3
      && typeof arguments[2] === 'object'
      && 'name' in arguments[2]
      && 'message' in arguments[2]
    ) {
      messages = arguments[1]
      var stack = {
        name: arguments[0]
        message: arguments[1],
        stack: ilog._errorify(arguments[2])
      }
    }

    else messages = format.apply(null, arguments)


    ilog._stdout.write(ilog._assembleLog(messages, 'DEBUG', ilog._time(new Date())))
    if (stack) jlog(stack)
  }
}

ilog.trace = function () {
  if (arguments.length && ilog.level >= 8) {
    let messages = format.apply(null, arguments)

    ilog._stdout.write(ilog._assembleLog(messages, 'TRACE', ilog._time(new Date())))
  }
}

ilog.auto = function (error) {
  if (error instanceof Error) return ilog.error(error)
  let args = slice(arguments, +(error == null))
  if (args.length === 1) ilog.info(args[0])
  else if (args.length > 1) ilog.debug.apply(null, args)
}

ilog.log = ilog
ilog._stdout = process.stdout
ilog._stderr = process.stderr
ilog._procname = process.argv[1].split('/').pop()

ilog._time = function (time) {
  return `${ilog._procname} »`
  // making generic
  // return `[${time.toISOString()}]`
}

ilog._stringify = function (obj) {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    return format(obj)
  }
}

ilog._assembleLog = function (log, level, time) {
  if (level) log = `${level} ${log}`

  // doing this to enable "time" to be configured as
  // a generic component prompt
  if (time) log = `${time} ${log}\n`
  else log = `${ilog._time()} ${log}\n`

  return log
}

ilog._errorify = function (error) {
  return new Errorify(error)
}

function Errorify (error) {
  this.name = error.name || 'Error'
  this.message = error.message || format(error)

  if (error.code) this.code = error.code
  if (error.errno) this.errno = error.errno
  if (error.status) this.status = error.status
  if (error.syscall) this.syscall = error.syscall
  if (!Array.isArray(error)) {
    Object.keys(error).map((key) => {
      if (!this[key]) this[key] = error[key]
    })
  }
  if (error.stack) this.stack = error.stack
}

module.exports = ilog