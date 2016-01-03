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
var daysLeftThisWeek   = require('./daysLeftThisWeek')
var daysLeftThisMonth  = require('./daysLeftThisMonth')
var daysLeftThisYear   = require('./daysLeftThisYear')

function dateFormat (date, mask) {
  if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
    mask = date
    date = undefined
  }

  date = date || new Date()

  if (date instanceof Date) date = new Date(date)
  else date = new Date(Date.parse(date))

  if (isNaN(date)) throw TypeError('Invalid date')

  // what we wish to match
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMSsTt])\1?|[oZWQNv]|O{1,2}|u{1,2}|x{1,3}|'[^']*'/g
  // what we don't wish to match -- need to optimize!!
  var antiToken = /[AaBbCcDEeFfGgIiJjKkLlnPpqRrUVwXYz0-9\?\.\,\!@#\$%\^\&\*\(\)\+\-]/g

  // what mask to use
  mask = String(frmt[mask] || antiPattern(mask, antiToken) || frmt.default)

  function makeIterator (fn) {
    return function (mask, token) {
      return fn(date, mask)
    }
  }

  return mask.replace(token, makeIterator(convertFlag))
}

function convertFlag (date, token) {
  var tokens = {
    d     : () => date.getDate(),
    dd    : () => pad(date.getDate(), 2),
    ddd   : () => nameOfDay(date, 3),
    dddd  : () => nameOfDay(date),
    m     : () => date.getMonth() + 1,
    mm    : () => pad(date.getMonth() + 1, 2),
    mmm   : () => nameOfMonth(date, 3),
    mmmm  : () => nameOfMonth(date),
    yyyy  : () => pad(date.getFullYear(), 4),
    yy    : () => pad(date.getFullYear() % 100, 2),
    h     : () => date.getHours() % 12 || 12,
    hh    : () => pad(date.getHours() % 12 || 12, 2),
    H     : () => date.getHours(),
    HH    : () => pad(date.getHours(), 2),
    M     : () => date.getMinutes(),
    MM    : () => pad(date.getMinutes(), 2),
    S     : () => date.getSeconds(),
    SS    : () => pad(date.getSeconds(), 2),
    s     : () => date.getMilliseconds(),
    ss    : () => pad(date.getMilliseconds(), 3),
    t     : () => date.getHours() < 12 ? ' a' : ' p',
    tt    : () => date.getHours() < 12 ? ' am' : ' pm',
    T     : () => date.getHours() < 12 ? ' A' : ' P',
    TT    : () => date.getHours() < 12 ? ' AM' : ' PM',
    N     : () => dayOfTheYear(date),
    W     : () => weekOfTheYear(date),
    Q     : () => quarterOfTheYear(date),
    Z     : () => timezoneOffset(date),
    u     : () => totalDaysThisMonth(date),
    uu    : () => totalDaysThisYear(date),
    x     : () => daysLeftThisWeek(date),
    xx    : () => daysLeftThisMonth(date),
    xxx   : () => daysLeftThisYear(date),
    v     : () => isLeapYear(date),
    o     : () => ordinal(date.getDate()),
    O     : () => nameOfDay(date, 1),
    OO    : () => nameOfDay(date, 2),
    defaults : () => token.replace(/'/g, '')
  }
  return typeof tokens[token] !== 'function'
    ? tokens.defaults()
    : tokens[token]()
}

function antiPattern (mask, token) {
  if (!token.test(mask)) return mask
  return false
}

module.exports = dateFormat
