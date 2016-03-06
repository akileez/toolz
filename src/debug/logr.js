'use strict'

// const format = require('../util/sprintf').sprintf
// const callr  = require('./callsite')
const nano   = require('../time/nano')
const slice  = require('../array/slice')
const jlog   = require('../util/jcolorz')
const clrz   = require('../util/colorz')
// const xtend  = require('../object/xtend')
// const reduce = require('../array/reduce')
// const apply  = require('../function/apply')
// const diff   = require('../assertion/variable-diff')

function dlogr () {
  // don't penalize a single string/template being passed as a param
  arguments.length > 1
    ? dlogr._stdout.write(dlogr._log(slice(arguments).join(' ')))
    : dlogr._stdout.write(dlogr._log(arguments[0]))
}

dlogr.level = 1
dlogr.colors = true
dlogr.timer = false
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

dlogr.blk = clrz.black
dlogr.blu = clrz.cyan
dlogr.mag = clrz.magenta
dlogr.yel = clrz.yellow
dlogr.red = clrz.red
dlogr.grn = clrz.green
dlogr.gry = clrz.grey
dlogr.cyn = clrz.cyan
dlogr.fmt = clrz.wrap
dlogr.dim = (str) => {
  return clrz.wrap(str, ['dim', 'black'])
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
      prefix: ['timer', 'white'],
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

dlogr._color = function (label, color) {
  if (!color || !dlogr.colors) return label
  return dlogr._colorizr[color](label)
}

dlogr._log = function (log, level, label) {
  log = `${log}\n`
  if (level) log = `${level} ${log}`
  if (label) log = `${label} ${log}\n`

  return log
}

dlogr._label = function () {
  return `${dlogr._procname} ${dlogr._pointer.double}`
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

module.exports = dlogr
