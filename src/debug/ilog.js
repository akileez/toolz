// adopted from: ilog <https://github.com/teambition/ilog>
// Copyright (c) 2015 Teambition (License: MIT)

'use strict'

const format = require('../util/sprintf').sprintf
const callr  = require('./callsite')
const nano   = require('../time/nano')
const slice  = require('../array/slice')
const jlog   = require('../util/jcolorz')
const clrz   = require('../util/colorz')
const apply  = require('../function/apply')

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
    ilog._stdout.write(ilog._assembleLog(apply(format, null, slice(arguments))))
  }
}

// Own version: meant for raw string output to log
function logr () {
  // don't penalize a single string/template being passed as a param
  arguments.length > 1
    ? ilog._stdout.write(ilog._assembleLog(slice(arguments).join(' ')))
    : ilog._stdout.write(ilog._assembleLog(arguments[0]))
}

// options for display, preserving the original functionality by reversing values.
ilog.dates = false
ilog.colors = true
ilog.verbose = true
ilog.timer = false

// ilog.level === -1 turns off all levels
// ilog.level === -2 turns on trace logging only
// ilog.level === -3 adds debug logging
// ilog.level === -4 adds notice and info levels
ilog.level = 7
ilog.levels = levels.slice()

// ilog.fatal, ilog.critical, ilog.error, ilog.warning, ilog.alert
map(levels.slice(0, 5), (level, index) => {
  ilog[level.toLowerCase()] = function (error, stack) {
    if (error != null && index <= ilog.level) {
      // allow the ability to pass debugging messages as strings
      if (typeof error === 'string') error = {message: error}

      error.name = level.charAt(0) + level.slice(1).toLowerCase()
      error.level = index

      if (stack) {
        error.stack = stack
      }

      error = ilog.colors && ilog.verbose
        ? ilog._errorify(error)
        : ilog._stringify(ilog._standardize(error))

      let type = function (obj) {
        return typeof obj === 'string'
          ? obj
          : obj.message
      }

      ilog._outputDisplay(type(error), {name: clrz.brRed(level), color: ''})

      if (ilog.colors) ilog.inspect(error)
    }
  }
})

// ilog.notice, ilog.info
map(levels.slice(5, 7), (level, index) => {
  index += 5
  ilog[level.toLowerCase()] = function (message) {
    if (message != null && (index <= ilog.level || ilog.level <= -4)) {
      message = ilog._stringify(message)

      ilog._outputDisplay(message, {name: level, color: 'grey'})
    }
  }
})

ilog.debug = function () {
  if (arguments.length && (ilog.level >= 7 || ilog.level <= -3)) {
    let messages
    let stack = false

    if (arguments.length === 1) {
      messages = ilog._stringify(arguments[0])
    }

    else  {
      messages = arguments[0]
      stack = true
    }

    if (!ilog.colors || !ilog.verbose) messages = apply(format, null, slice(arguments))

    ilog._outputDisplay(messages, {name: 'DEBUG', color: 'cyan'})

    if (stack && ilog.colors) {
      forEach(slice(arguments, 1), (view) => {
        ilog.inspect(ilog._inspectify(view))
      })
    }
  }
}

ilog.assert = function (expression, label) {
  if (ilog.level >= 7 || ilog.level <= -3) {
    let result = !!expression
    let stack = {
      name: 'Assertion Test',
      message: label,
      actual: result,
      expected: true
    }

    let msg = ilog.colors && ilog.verbose
      ? label
      : ilog._stringify(stack)

    ilog._outputDisplay(msg, {name: 'ASERT', color: 'cyan'})
    if (ilog.colors) ilog.inspect(stack)
  }
}

// trace logging [level 8]
ilog.trace = function () {
  if (arguments.length && (ilog.level >= 8 || ilog.level <= -2)) {
    let messages = apply(format, null, slice(arguments))

    ilog._outputDisplay(messages, {name: 'TRACE', color: 'yellow'})
  }
}

ilog.tracer = function (prefix, prompt) {
  if (prompt == null) prompt = ilog._pointer.double
  if (prefix == null) {
    prefix =  '' //['LOGGR', 'black']
    prompt =  ' ' + prompt
  }

  return (nsp, clrs) => {
    return function () {
      if (arguments.length && (ilog.level >= 8 || ilog.level <= -2)) {
        let messages = apply(format, null, slice(arguments))

        ilog._outputDisplay(messages, {prefix: prefix, prompt: prompt, name: nsp, color: clrs})
      }
    }
  }
}

ilog.auto = function (error) {
  if (error instanceof Error) return ilog.error(error)

  let args = slice(arguments, +(error == null))

  if (args.length === 1) ilog.info(args[0])
  else apply(ilog.debug, null, args)
}

ilog.inspect = function () {
  if (ilog.verbose && ilog.level !== -1) {
    if (arguments.length > 1 && typeof arguments[0] === 'string') {
      ilog._outputDisplay(`Inspecting ${arguments[0]}: `, {name: 'LOGGR', color: 'white'})
      map(slice(arguments, 1), (arg) => {
        ilog._inspector(arg)
      })
    }

    else {
      map(slice(arguments), (arg) => {
        ilog._inspector(arg)
      })
    }
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
  let diff = process.hrtime(ilog.timeTables[label])
  let diffMs = nano(diff, 'ms', 3)

  if (ilog.level !== -1 && ilog.timer) {
    let msg = `${label} took: ${ilog._color(diffMs, 'grey')} ms`
    let frmt = {name: 'TIMER', color: 'white'}

    ilog._outputDisplay(msg, frmt)
  }

  delete ilog.timeTables[label]
  return diffMs
}

ilog.log = logr
ilog._inspector = jlog // expose json-colorz
ilog._stdout = process.stdout
ilog._stderr = process.stderr
ilog._procname = process.argv[1].split('/').pop()
ilog._pointer = {
  tick       : '✔',
  check      : '√',
  cross      : '✖',
  star       : '★',
  bullet     : '*',
  dot        : '․',
  line       : '─',
  dash       : '-',
  ellipsis   : '…',
  info       : 'i',
  info2      : 'ℹ',
  warning    : '‼',
  warning2   : '⚠',
  flag       : '⚑',
  mark       : '✗',
  tilde      : '~',
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

ilog._outputDisplay = function (log, level, label) {
  // construct components
  level = ilog._assembleLvl(level)
  label = ilog.dates ? ilog._label(new Date()) : ilog._label()

  // compose and log message
  ilog._stdout.write(ilog._assembleLog(log, level, label))
}

ilog._assembleLvl = function (obj) {
  let construct
  let prefix
  let prompt

  // the prompt is essentially a separator.
  if (obj.prompt) {
    if (Array.isArray(obj.prompt)) {
      prompt = ilog._color(obj.prompt[0], obj.prompt[1])
    } else {
      prompt = ilog._color(obj.prompt)
    }
  } else {
    prompt = ''
  }
  if (obj.prefix) {
    if (Array.isArray(obj.prefix)) {
      prefix = ilog._color(obj.prefix[0], obj.prefix[1]) + ' '+prompt + ' '
    } else {
      prefix = ilog._color(obj.prefix) + ' '+prompt + ' '
    }
  } else {
    prefix = ''
  }

  if (Array.isArray(obj.name)) {
    construct = map(obj.name, (lvlname, idx) => {
      let sp
      let prompto = ' '+prompt+' '
      if (idx === obj.name.length - 1) prompto = ' '+prompt
      if (idx === 0) sp = ''
      else sp = prefix ? '' : ' '

      return sp + ilog._color(lvlname, obj.color[idx]) + (prefix ? prompto : prompt)
    }).join('')
  } else {
    construct = ilog._color(obj.name, obj.color) + (prefix ? ' '+prompt : prompt)
  }

  return prefix + construct
}

ilog._color = function (label, color) {
  if (!color || !ilog.colors) return label
  return `\u001b[${clrs[color]}m${label}\u001b[39m`
}

ilog._label = function () {
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

// Setup a standardized message for low level logging
ilog._standardize = function (message) {
  return new Standardize(message)
}

function Standardize (msg) {
  // const os       = require('os')
  const pid      = process.pid
  // const hostname = os.hostname()

  this.pid = process.pid
  // this.hostname = hostname
  this.name = msg.name
  this.level = msg.level
  this.message = msg.message
  if (ilog.dates) this.time = new Date()
  this.v = 0
}

ilog._errorify = function (error) {
  return new Errorify(error)
}

function Errorify (error) {
  this.name = error.name || 'Error'
  this.level = error.level
  this.message = error.message || apply(format,null, error)

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

function forEach (array, iterator) {
  var i = -1
  var len = array >= 0 ? array : array.length

  while (++i < len) iterator(array[i], i)
}

function map (arr, fn) {
  var results = []
  if (arr == null) return results

  var i = -1
  var len = arr.length

  while (++i < len) {
    results[i] = fn(arr[i], i, arr)
  }
  return results
}

module.exports = ilog
