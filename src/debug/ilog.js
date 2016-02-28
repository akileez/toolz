// adopted from: ilog <https://github.com/teambition/ilog>
// Copyright (c) 2015 Teambition (License: MIT)

'use strict'

const format = require('util').format
const jlog   = require('../util/jcolorz')
const ccase  = require('../string/sentenceCase')
const map    = require('../array/map')
const slice  = require('../array/slice')
const nano   = require('../time/nano')

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

const clrs = {
  black   : 30,
  gray    : 90,
  grey    : 90,
  red     : 31,
  green   : 32,
  yellow  : 33,
  blue    : 34,
  magenta : 35,
  cyan    : 36,
  white   : 37
}

// Original version
function ilog () {
  if (arguments.length) {
    ilog._stdout.write(ilog._assembleLog(format.apply(null, arguments)))
  }
}

// Own version: meant for raw string output to log
ilog.log = function () {
  // don't penalize a single string/template being passed as a param
  arguments.length > 1
    ? ilog._stdout.write(ilog._assembleLog(slice(arguments).join(' ')))
    : ilog._stdout.write(ilog._assembleLog(arguments[0]))
}

// options for display, preserving the original functionality by reversing values.
ilog.display = {
  colors: true,
  dates: false,
  jlog: true
}

// ilog.level === -1 turns off all levels
// ilog.level === -2 turns on debug logging only
// ilog.level === -3 turns on debug and trace logging
// ilog.level === -4 adds notice and info logging
ilog.level = 7
ilog.levels = levels.slice()

// ilog.fatal, ilog.critical, ilog.error, ilog.warning, ilog.alert
map(levels.slice(0, 5), (level, index) => {
  ilog[level.toLowerCase()] = function (error, stack) {
    if (error != null && index <= ilog.level) {
      // allow the ability to pass debugging messages as strings
      if (typeof error === 'string') error = {message: error}
      if (stack) error.stack = ilog._errorify(stack)

      error.name = ccase(level)

      let color = ilog.display.colors ? ilog._color(level, 'red') : level
      let label = ilog.display.dates ? ilog._label(new Date()) : ilog._label()

      error = ilog.display.colors
        ? ilog._errorify(error)
        : ilog._stringify(ilog._errorify(error))

      let type = function (obj) {
        return typeof obj === 'string'
          ? obj
          : obj.message
      }

      ilog._stderr.write(ilog._assembleLog(type(error), color, label))
      if (ilog.display.colors && ilog.display.jlog) jlog(error)
    }
  }
})

// ilog.notice, ilog.info
map(levels.slice(5, 7), (level, index) => {
  index += 5
  ilog[level.toLowerCase()] = function (message) {
    if (message != null && (index <= ilog.level || ilog.level <= -4)) {
      message = ilog._stringify(message)

      let color = ilog.display.colors ? ilog._color(level, 'grey') : level
      let label = ilog.display.dates ? ilog._label(new Date()) : ilog._label()

      ilog._stdout.write(ilog._assembleLog(message, color, label))
    }
  }
})

ilog.debug = function () {
  if (arguments.length && (ilog.level >= 7 || ilog.level <= -2)) {
    let messages

    if (arguments.length === 1) {
      messages = ilog._stringify(arguments[0])
    }

    else if (arguments.length === 2
      && typeof arguments[1] === 'object'
      && 'name' in arguments[1]
      && 'message' in arguments[1]
    ) {
      messages = arguments[0]
      var stack = {
        name: 'Debug',
        message: arguments[0],
        stack: ilog._errorify(arguments[1])
      }
    }

    else messages = format.apply(null, arguments)

    let color = ilog.display.colors
      ? ilog._color('DEBUG', 'blue')
      : 'DEBUG'

    let label = ilog.display.dates
      ? ilog._label(new Date())
      : ilog._label()

    ilog._stdout.write(ilog._assembleLog(messages, color, label))
    if (ilog.display.colors && ilog.display.jlog && stack) jlog(stack)
  }
}

// trace logging [level 8]
ilog.trace = function () {
  if (arguments.length && (ilog.level >= 8 || ilog.level <= -3)) {
    // contruct components
    let messages = format.apply(null, arguments)
    let color = ilog.display.colors ? ilog._color('LOGR', 'yellow') : 'LOGR'
    let label = ilog.display.dates ? ilog._label(new Date()) : ilog._label()

    // compose message
    let assemble = ilog._assembleLog(messages, color, label)

    // log message
    ilog._stdout.write(assemble)
  }
}

ilog.assert = function (expression, label) {
  let result = !!expression
  let stack = {
    name: 'Assert',
    message: label,
    actual: result,
    expected: true
  }

  if (result) ilog.debug('Assertion Passed', stack)
  else ilog.error('Assertion Failed', stack)
}

ilog.auto = function (error) {
  if (error instanceof Error) return ilog.error(error)
  let args = slice(arguments, +(error == null))
  if (args.length === 1) ilog.info(args[0])
  else if (args.length > 1) ilog.debug.apply(null, args)
}

// expose json-colorz
ilog.jlog = function (desc) {
  if (ilog.display.jlog) {
    ilog.log(desc)
    map(slice(arguments, 1), (arg) => {
      jlog(arg)
    })
  }
}

// implement base start and stop times
// adopted from debug-logger
ilog.timeTables = {}

ilog.strt = function time (label) {
  if (Array.isArray(label)) {
    map(label, (lab) => {
      ilog.timeTables[lab] = process.hrtime()
    })
  }

  else {
    ilog.timeTables[label] = process.hrtime()
  }
}

ilog.stop = function timeEnd (label) {
  var diff = process.hrtime(ilog.timeTables[label])
  var diffMs = nano(diff, 'ms', 3)
  ilog.log(`${label} took: ${ilog._color(diffMs, 'grey')} ms`)
}

ilog._stdout = process.stdout
ilog._stderr = process.stderr
ilog._procname = process.argv[1].split('/').pop()
ilog._pointer = {
  tick       : '✔',
  check      : '√',
  cross      : '✖',
  star       : '★',
  bullet     : '*',
  info       : 'i',
  info2      : 'ℹ',
  warning    : '‼',
  warning2   : '⚠',
  clip       : '❯',
  single     : '›',
  double     : '»',
  arrowUp    : '↑',
  arrowDown  : '↓',
  arrowLeft  : '←',
  arrowRight : '→',
  radioOn    : '◉',
  radioOff   : '◯'
}

ilog._color = function (label, color) {
  return `\u001b[${clrs[color]}m${label}\u001b[39m`
}

ilog._label = function (label) {
  return `${ilog._procname} ${ilog._pointer.double}`
}

ilog._assembleLog = function (log, level, label) {
  if (level) log = `${level} ${log}`
  if (label) log = `${label} ${log}\n`
  else log = `${ilog._label()} ${log}\n`

  return log
}

ilog._stringify = function (obj) {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    return format(obj)
  }
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
