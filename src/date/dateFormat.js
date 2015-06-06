var kindOf = require('../lang/kindOf')
var pad = require('../number/pad')
var nameOfDay = require('./nameOfDay')
var nameOfMonth = require('./nameOfMonth')


function dateFormat (date, mask) {
  if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
    mask = date
    date = undefined
  }

  date = date || new Date
  if (date instanceof Date) date = new Date(date)
  else date = new Date(Date.parse(date))

  if (isNaN(date)) throw TypeError('Invalid date')

  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMSsTt])\1?|[LloOZWQNv]|u{1,2}|x{1,3}|'[^']*'/g
  var flags = {
    d        : date.getDate(),
    dd       : pad(date.getDate(), 2),
    ddd      : nameOfDay(date, 3),
    dddd     : nameOfDay(date),
    m        : date.getMonth() + 1,
    mm       : pad(date.getMonth() + 1, 2),
    mmm      : nameOfMonth(date, 3),
    mmmm     : nameOfMonth(date),
    yyyy     : pad(date.getFullYear(), 4),
    yy       : pad(date.getFullYear() % 100, 2),
    h        : hr,
    hh       : pad(hr),
    H        : hours,
    HH       : pad(hours),
    M        : mins,
    MM       : pad(mins),
    S        : secs,
    SS       : pad(secs),
    s        : ms,
    ss       : pad(ms, 3),
    t        : hours < 12 ? ' a' : ' p',
    tt       : hours < 12 ? ' am' : ' pm',
    T        : hours < 12 ? ' A' : ' P',
    TT       : hours < 12 ? ' AM' : ' PM',
    N        : daythisyear,
    W        : thisweek,
    Q        : thisquarter,
    Z        : GMT,
    u        : daysthismonth,
    uu       : daysthisyear,
    x        : daysleftthisweek,
    xx       : daysleftthismonth,
    xxx      : daysleftthisyear,
    v        : isLeapYear(),
    o        : ordinal,
    O        : dayNames.slice(0, 2),
    L        : dayNames.slice(0, 1)
  }

}