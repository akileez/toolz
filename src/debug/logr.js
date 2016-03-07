'use strict'

const nano   = require('../time/nano')
const slice  = require('../array/slice')
const jlog   = require('../util/jcolorz')
const clrz   = require('../util/colorz')

function logr () {
  // don't penalize a single string/template being passed as a param
  arguments.length > 1
    ? logr._stdout.write(logr._log(slice(arguments).join(' ')))
    : logr._stdout.write(logr._log(arguments[0]))
}

function loggr () {
  logr._stdout.write(logr._log(
    slice(arguments, 1).join(' '),
    logr._level({name: arguments[0]}),
    logr._label()
  ))
}
logr.log = loggr
logr.level = 1
logr.colors = true
logr.timer = false

logr.nano = nano // expose nano
logr._inspector = jlog // expose json-colorz
logr._colorizr = clrz // expose colorz
logr._stdout = process.stdout
logr._stderr = process.stderr
logr._procname = process.argv[1].split('/').pop()
logr._pointer = {
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

logr.blk = clrz.black
logr.blu = clrz.cyan
logr.mag = clrz.magenta
logr.yel = clrz.yellow
logr.red = clrz.red
logr.grn = clrz.green
logr.gry = clrz.grey
logr.cyn = clrz.cyan
logr.fmt = clrz.wrap
logr.dim = (str) => {
  return clrz.wrap(str, ['dim', 'black'])
}

// implement base start and stop times
// adopted from debug-logger
logr.timeTables = {}

logr.strt = function time (label) {
  if (Array.isArray(label)) {
    map(label, (lab) => {
      logr.timeTables[lab] = process.hrtime()
    })
  }

  else {
    logr.timeTables[label] = process.hrtime()
  }
}

logr.stop = function timeEnd (label) {
  let diff = process.hrtime(logr.timeTables[label])
  let diffMs = nano(diff, 'ms', 3)

  if (logr.level !== -1 && logr.timer) {
    let msg = `took: ${logr._color(diffMs, 'grey')} ms`

    let frmt = {
      prefix : ['timer', 'grey'],
      prompt : [logr._pointer.double, 'red'],
      name   : label,
      color  : 'grey'
    }

    logr._stdout.write(logr._log(msg,
      logr._level(frmt),
      logr._label()
    ))
  }

  delete logr.timeTables[label]
  return diffMs
}

logr._color = function (label, color) {
  if (!color || !logr.colors) return label
  return logr._colorizr[color](label)
}

logr._log = function (log, level, label) {
  log = `${log}\n`
  if (level) log = `${level} ${log}`
  if (label) log = `${label} ${log}`

  return log
}

logr._label = function () {
  return `${logr._procname} ${logr._pointer.double}`
}

logr._level = function (obj) {
  let msg
  let prefix
  let prompt
  obj = obj || {}

  // the prompt is essentially a separator.
  if (obj.prompt) {
    if (Array.isArray(obj.prompt)) {
      prompt = logr._color(obj.prompt[0], obj.prompt[1])
    } else {
      prompt = logr._color(obj.prompt)
    }
  } else {
    prompt = ''
  }
  if (obj.prefix) {
    if (Array.isArray(obj.prefix)) {
      prefix = logr._color(obj.prefix[0], obj.prefix[1]) + ' '+prompt + ' '
    } else {
      prefix = logr._color(obj.prefix) + ' '+prompt + ' '
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

      return sp + logr._color(lvlname, obj.color[idx]) + (prefix ? prompto : prompt)
    }).join('')
  } else {
    msg = logr._color(obj.name, obj.color) + (prefix ? ' '+prompt : prompt)
  }

  return obj.name ? prefix + msg : ''
}

module.exports = logr
