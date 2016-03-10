// adopted from: ilog <https://github.com/teambition/ilog>
// Copyright (c) 2015 Teambition (License: MIT)

'use strict'

const format = require('../util/sprintf').sprintf
const callr  = require('./callsite')
const nano   = require('../time/nano')
const slice  = require('../array/slice')
const jlog   = require('../util/jcolorz')
const clrz   = require('../util/colorz')
const xtend  = require('../object/xtend')
const apply  = require('../function/apply')
const diff   = require('../assertion/variable-diff')

const levels = [
  'fatal',    // level 0
  'critical', // level 1
  'error',    // level 2
  'warn',     // level 3
  'alrt',     // level 4
  'note',     // level 5
  'info',     // level 6
  'debug'     // level 7
]

// Original version
function dlogr () {
  if (arguments.length) {
    dlogr._stdout.write(dlogr._log(apply(format, null, slice(arguments))))
  }
}

// Own version: meant for raw string output to log
function logr () {
  // don't penalize a single string/template being passed as a param
  arguments.length > 1
    ? dlogr._stdout.write(dlogr._log(slice(arguments).join(' ')))
    : dlogr._stdout.write(dlogr._log(arguments[0]))
}

// options for display, preserving the original functionality by reversing values.
dlogr.dates = false
dlogr.colors = true
dlogr.verbose = true
dlogr.timer = false

// dlogr.level === -1 turns off all levels
// dlogr.level === -2 turns on trak logging
// dlogr.level === -3 turns on debug logging
dlogr.level = 7
dlogr.levels = levels.slice()

dlogr.log = logr
dlogr.nano = nano
dlogr.vdiff = diff
dlogr._inspector = jlog // expose json-colorz
dlogr._colorizr = clrz // expose colorz
dlogr._stdout = process.stdout
dlogr._stderr = process.stderr
dlogr._procname = process.argv[1].split('/').pop()
dlogr._pointer = {
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

dlogr.blk = dlogr._colorizr.black
dlogr.blu = dlogr._colorizr.cyan
dlogr.mag = dlogr._colorizr.magenta
dlogr.yel = dlogr._colorizr.yellow
dlogr.red = dlogr._colorizr.red
dlogr.grn = dlogr._colorizr.green
dlogr.gry = dlogr._colorizr.grey
dlogr.cyn = dlogr._colorizr.cyan
dlogr.fmt = dlogr._colorizr.wrap
dlogr.dim = (str) => {
  return dlogr._colorizr.wrap(str, ['dim', 'black'])
}

dlogr.trace = function () {
  if (dlogr.level >= 8 || dlogr.level <= -2) {
    if (arguments.length) {
      let messages = apply(format, null, slice(arguments))
      let level = {
        prefix: ['debug', 'green'],
        prompt: dlogr._pointer.double,
        name: 'stack',
        color: 'magenta'
      }

      dlogr._stdout.write(dlogr._log(messages,
        dlogr._level(level),
        dlogr._label()
      ))
    }

    dlogr._stdout.write('\n')
    forEach(callr(), function (site) {
      dlogr._stdout.write(format('  \u001b[36m%s\u001b[90m in %s at line \u001b[32m%d\u001b[0m\n',
        site.getFunctionName() || 'anonymous',
        site.getFileName(),
        site.getLineNumber()
      ))
    })
    dlogr._stdout.write('\n')
  }
}

dlogr.trak = function (level) {
  return function trak () {
    if (arguments.length === 0
      || arguments[0] == null
      || (dlogr.level < 5 && dlogr.level > -4 )
    ) return

    let defs = {
      prefix : ['trak', 'brBlue'],
      prompt : [dlogr._pointer.double, ''],
      name   : '',
      color  : ''
    }

    level = xtend(defs, level || {})

    let messages = hasFormattingElements(arguments[0])
      ? apply(format, null, slice(arguments))
      : arguments[0] + map(slice(arguments, 1), (arg) => format(' %j', arg))

    dlogr._stdout.write(dlogr._log(messages,
      dlogr._level(level),
      dlogr._label()
    ))
  }
}

dlogr.trakor = function (prefix, prompt) {
  if (prompt == null) prompt = dlogr._pointer.double
  if (prefix == null) {
    prefix =  ''
    prompt =  ' ' + prompt
  }

  return (nsp, clrs) => {
    return function () {
      if (arguments.length === 0
        || arguments[0] == null
        || (dlogr.level < 8 && (dlogr.level > -2  || dlogr.level === -3))
      ) return

      let messages = apply(format, null, slice(arguments))
      let level = {prefix: prefix, prompt: prompt, name: nsp, color: clrs}

      dlogr._stdout.write(dlogr._log(messages,
        dlogr._level(level),
        dlogr._label()
      ))
    }
  }
}

dlogr.detector = function (level) {
  return function detector () {
    if (dlogr.level <= -1
      || arguments.length === 0
      || arguments[0] == null
    ) return

    const chk = dlogr.colors && dlogr.verbose
    const callsite = ['\n'].concat(map(callr(), (site) => {
      return format('  \u001b[36m%s\u001b[90m in %s at line \u001b[32m%d\u001b[0m\n',
        site.getFunctionName() || 'anonymous',
        site.getFileName(),
        site.getLineNumber()
      )
    })).join(' ')

    level = level || {}

    let defs = {
      prefix : ['error', 'brRed'],
      prompt : [dlogr._pointer.double, ''],
      name   : 'eros',
      color  : 'brRed',
      lvl    : 2,
      stack  : false
    }

    level = xtend(defs, level)

    let log = {}

    if (Array.isArray(level.name)) {
      log.name = level.name[0]
      log.type = level.name[1]
    } else log.name = level.name

    log.level = levels.indexOf(log.name)
    if (log.level === -1) log.level = level.lvl

    if (!(log.level <= dlogr.level)) return

    log.message = arguments[0].toString().replace('Error: ', '')

    // show a stack [callsite trace] if enabled
    if (arguments[1] != null) {
      log.stack = arguments[1]
      if (level.stack && chk) log.trace = callsite
    } else {
      if (level.stack && chk) log.stack = callsite
    }

    dlogr._stdout.write(dlogr._log(
      chk ? log.message : dlogr._stringify(dlogr._standardize(log)),
      dlogr._level(level),
      dlogr._label()
    ))

    if (chk) dlogr._inspector(dlogr._errorify(log))
  }
}

dlogr.inspector = function (level) {
  return function inspector () {
    if (dlogr.level < 7 && dlogr.level >= -2) return
    level = level || {}

    let defs = {
      prefix : ['debug', 'green'],
      prompt : [dlogr._pointer.double, ''],
      name   : 'loggr',
      color  : 'cyan',
      stack  : false
    }

    level = xtend(defs, level)

    const chk = dlogr.colors && dlogr.verbose
    let log = {}
    let out = () => {
      dlogr._stdout.write(dlogr._log(
        map(slice(arguments), (arg) => {return format(' obj: %j', arg)}),
        dlogr._level(level),
        dlogr._label()
      ))
      // dlogr._assemble(map(slice(arguments), (arg) => {return format(' obj: %j', arg)}), level)

      if (chk) map(slice(arguments), (arg) => {
        dlogr._inspector(arg)
      })
    }

    if (arguments.length > 1 && typeof arguments[0] === 'string') {
      log.message = arguments[0]
      log.args = slice(arguments, 1)

      if (hasFormattingElements(log.message)) {
        log.message = apply(format, null, slice(arguments))
      }

      dlogr._stdout.write(dlogr._log(log.message,
        dlogr._level(level),
        dlogr._label()
      ))

      if (chk) map(log.args, (arg) => {
        dlogr._inspector(arg)
      })
    } else out()

    // show a callsite trace
    if (level.stack && chk) {
      dlogr._stdout.write('\n')
      forEach(callr(), function (site) {
        dlogr._stdout.write(format('  \u001b[36m%s\u001b[90m in %s at line \u001b[32m%d\u001b[0m\n',
          site.getFunctionName() || 'anonymous',
          site.getFileName(),
          site.getLineNumber()
        ))
      })
      dlogr._stdout.write('\n')
    }
  }
}

dlogr.error    = dlogr.detector()
dlogr.eros     = dlogr.detector({stack: true})
dlogr.alrt     = dlogr.detector({name: 'alrt'})
dlogr.warn     = dlogr.detector({name: 'warn'})
dlogr.crit     = dlogr.detector({stack: true, name: 'critical'})
dlogr.fatal    = dlogr.detector({stack: true, name: 'fatal'})
dlogr.jlog     = dlogr.inspector()
dlogr.dbug     = dlogr.inspector({stack: true})
dlogr.diff     = dlogr.inspector({name: 'diff', color: 'cyan'})
dlogr.diffs    = dlogr.inspector({stack: true, name: ['diff', 'stack'], color: ['cyan', 'magenta']})
dlogr.inspect  = dlogr.inspector({name: 'inspect', color: 'cyan'})
dlogr.assertit = dlogr.inspector({name: ['assert'], color: ['magenta']})
dlogr.info     = dlogr.trak({name: 'info', color: 'blue', lvl: 6})
dlogr.note     = dlogr.trak({name: 'note', color: 'grey', lvl: 5})

dlogr.auto = function (error) {
  if (error instanceof Error) return apply(dlogr.eros, null, slice(arguments))

  let args = slice(arguments, +(error == null))

  if (hasFormattingElements(args[0])) {
    return apply(dlogr.info, null, args)
  }

  else apply(dlogr.jlog, null, args)
}

// implement base start and stop times
// adopted from debug-logger
dlogr.timeTables = {}

dlogr.strt = function time (label) {
  if (Array.isArray(label)) {
    map(label, (lab) => {
      dlogr.timeTables[lab] = process.hrtime()
    })
  }

  else {
    dlogr.timeTables[label] = process.hrtime()
  }
}

dlogr.stop = function timeEnd (label) {
  let diff = process.hrtime(dlogr.timeTables[label])
  let diffMs = nano(diff, 'ms', 3)

  if (dlogr.level !== -1 && dlogr.timer) {
    let msg = `took: ${dlogr._color(diffMs, 'grey')} ms`

    let frmt = {
      prefix: [dlogr.gry('timer')],
      prompt: [dlogr._pointer.double, 'red'],
      name: label,
      color: 'grey'
    }

    dlogr._stdout.write(dlogr._log(msg,
      dlogr._level(frmt),
      dlogr._label()
    ))
  }

  delete dlogr.timeTables[label]
  return diffMs
}

dlogr.frmt = function () {
  return apply(format, null, slice(arguments))
}

dlogr.differ = function differ (msg, a, b) {
  let res = diff(a, b)
  let txt = res.changed
    ? clrz.green(res.changed)
    : clrz.red(res.changed)

  if (res.changed) {
    dlogr.diffs(dlogr.frmt(msg, txt), res.text, a, b)
  } else {
    dlogr.diff(dlogr.frmt(msg, txt), 'no change', a)
  }
}

dlogr.assert = function assertit (msg, expression) {
  let res = !!expression
  let clr = res ? 'green' : 'red'

  dlogr.assertit(msg, dlogr._color(res, clr))
}

dlogr._trace = function () {
  dlogr._stdout.write('\n')
  forEach(callr(), function (site) {
    dlogr._stdout.write(format('  \u001b[36m%s\u001b[90m in %s at line \u001b[32m%d\u001b[0m\n',
      site.getFunctionName() || 'anonymous',
      site.getFileName(),
      site.getLineNumber()
    ))
  })
  dlogr._stdout.write('\n')
}

dlogr._color = function (label, color) {
  if (!color || !dlogr.colors) return label
  return dlogr._colorizr[color](label)
}

dlogr._log = function (log, level, label) {
  if (level) log = `${level} ${log}`
  if (label) log = `${label} ${log}\n`
  else log = `${dlogr._label()} ${log}\n`

  return log
}

dlogr._level = function (obj) {
  let msg
  let prefix
  let prompt
  obj = obj || {}

  // the prompt is essentially a separator.
  if (obj.prompt) {
    if (Array.isArray(obj.prompt)) {
      prompt = dlogr._color(obj.prompt[0], obj.prompt[1])
    } else {
      prompt = dlogr._color(obj.prompt)
    }
  } else {
    prompt = ''
  }
  if (obj.prefix) {
    if (Array.isArray(obj.prefix)) {
      prefix = dlogr._color(obj.prefix[0], obj.prefix[1]) + ' '+prompt + ' '
    } else {
      prefix = dlogr._color(obj.prefix) + ' '+prompt + ' '
    }
  } else {
    prefix = ''
  }

  if (Array.isArray(obj.name)) {
    msg = map(obj.name, (lvlname, idx) => {
      let sp
      let prompto = ' '+prompt+' '
      if (idx === obj.name.length - 1) prompto = ' '+prompt
      if (idx === 0) sp = ''
      else sp = prefix ? '' : ' '

      return sp + dlogr._color(lvlname, obj.color[idx]) + (prefix ? prompto : prompt)
    }).join('')
  } else {
    msg = dlogr._color(obj.name, obj.color) + (prefix ? ' '+prompt : prompt)
  }

  return obj.name ? prefix + msg : dlogr._color('inspect ', 'cyan') + dlogr._pointer.double
}

dlogr._label = function () {
  return `${dlogr._procname} ${dlogr._pointer.double}`
}

dlogr._stringify = function (obj) {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    return format(obj)
  }
}

// Setup a standardized message for low level logging
dlogr._standardize = function (message) {
  return new Standardize(message)
}

function Standardize (msg) {
  // const os       = require('os')
  // const pid      = process.pid
  // const hostname = os.hostname()

  // this.pid = process.pid
  // this.hostname = hostname
  this.name = msg.name
  this.level = msg.level
  this.message = msg.message
  if (dlogr.dates) this.time = new Date()
  this.stack = msg.stack
  this.v = 0
}

dlogr._errorify = function (error) {
  return new Errorify(error)
}

function Errorify (error) {
  this.name = error.name.toUpperCase() || 'Error'
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

function hasFormattingElements(str){
  if(!str) return false
  var res = false

  forEach(['%s', '%d', '%j', '%t'], (elem) => {
    if(str.indexOf(elem) >= 0) res = true
  })

  return res;
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

module.exports = dlogr
