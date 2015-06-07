var kindOf             = require('../lang/kindOf')
var pad                = require('../number/pad')
var ordinal            = require('../number/ordinal')
var frmt               = require('./dateMasks')
var nameOfDay          = require('./nameOfDay')
var nameOfMonth        = require('./nameOfMonth')
var isLeapYear         = require('./isLeapYear')
var dayOfTheYear       = require('./dayOfTheYear')
var quarterOfTheYear   = require('./quarterOfTheYear')
var weekOfTheYear      = require('./weekOfTheYear')
var timezoneOffset     = require('./timezoneOffset')
var totalDaysThisMonth = require('./totalDaysThisMonth')
var totalDaysThisYear  = require('./totalDaysThisYear')

function dateFormat (date, mask) {
  if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
    mask = date
    date = undefined
  }

  date = date || new Date
  if (date instanceof Date) date = new Date(date)
  else date = new Date(Date.parse(date))

  if (isNaN(date)) throw TypeError('Invalid date')

  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMSsTt])\1?|[oZWQNv]|O{1,2}|u{1,2}|x{1,3}|'[^']*'/g
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
    h        : date.getHours() % 12 || 12,
    hh       : pad(date.getHours() % 12 || 12, 2),
    H        : date.getHours(),
    HH       : pad(date.getHours(),2),
    M        : date.getMinutes(),
    MM       : pad(date.getMinutes(), 2),
    S        : date.getSeconds(),
    SS       : pad(date.getSeconds(),2),
    s        : date.getMilliseconds(),
    ss       : pad(date.getMilliseconds(), 3),
    t        : date.getHours() < 12 ? ' a' : ' p',
    tt       : date.getHours() < 12 ? ' am' : ' pm',
    T        : date.getHours() < 12 ? ' A' : ' P',
    TT       : date.getHours() < 12 ? ' AM' : ' PM',
    N        : dayOfTheYear(date),
    W        : weekOfTheYear(date),
    Q        : quarterOfTheYear(date),
    Z        : timezoneOffset(date),
    u        : totalDaysThisMonth(date),
    uu       : totalDaysThisYear(date),
    x        : daysLeftThisWeek(date),
    xx       : daysLeftThisMonth(date),
    xxx      : daysLeftThisYear(date),
    v        : isLeapYear(date),
    o        : ordinal(date.getDate()),
    O        : nameOfDay(date, 1),
    OO       : nameOfDay(date, 2)
  }

  mask = String(frmt[mask] || mask || frmt.default)
  return mask.replace(token, function (match) {
    if (match in flags) return flags[match]
    return match.slice(1, match.length - 1)
  })
}

function daysLeftThisWeek (date) {
  return 6 - date.getDay()
}

function daysLeftThisMonth (date) {
  return totalDaysThisMonth(date) - date.getDate()
}

function daysLeftThisYear (date) {
  return totalDaysThisYear(date) - dayOfTheYear(date)
}

module.exports = dateFormat
