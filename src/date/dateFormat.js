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
    d     : () => {return date.getDate()},
    dd    : () => {return pad(date.getDate(), 2)},
    ddd   : () => {return nameOfDay(date, 3)},
    dddd  : () => {return nameOfDay(date)},
    m     : () => {return date.getMonth() + 1},
    mm    : () => {return pad(date.getMonth() + 1, 2)},
    mmm   : () => {return nameOfMonth(date, 3)},
    mmmm  : () => {return nameOfMonth(date)},
    yyyy  : () => {return pad(date.getFullYear(), 4)},
    yy    : () => {return pad(date.getFullYear() % 100, 2)},
    h     : () => {return date.getHours() % 12 || 12},
    hh    : () => {return pad(date.getHours() % 12 || 12, 2)},
    H     : () => {return date.getHours()},
    HH    : () => {return pad(date.getHours(), 2)},
    M     : () => {return date.getMinutes()},
    MM    : () => {return pad(date.getMinutes(), 2)},
    S     : () => {return date.getSeconds()},
    SS    : () => {return pad(date.getSeconds(), 2)},
    s     : () => {return date.getMilliseconds()},
    ss    : () => {return pad(date.getMilliseconds(), 3)},
    t     : () => {return date.getHours() < 12 ? ' a' : ' p'},
    tt    : () => {return date.getHours() < 12 ? ' am' : ' pm'},
    T     : () => {return date.getHours() < 12 ? ' A' : ' P'},
    TT    : () => {return date.getHours() < 12 ? ' AM' : ' PM'},
    N     : () => {return dayOfTheYear(date)},
    W     : () => {return weekOfTheYear(date)},
    Q     : () => {return quarterOfTheYear(date)},
    Z     : () => {return timezoneOffset(date)},
    u     : () => {return totalDaysThisMonth(date)},
    uu    : () => {return totalDaysThisYear(date)},
    x     : () => {return daysLeftThisWeek(date)},
    xx    : () => {return daysLeftThisMonth(date)},
    xxx   : () => {return daysLeftThisYear(date)},
    v     : () => {return isLeapYear(date)},
    o     : () => {return ordinal(date.getDate())},
    O     : () => {return nameOfDay(date, 1)},
    OO    : () => {return nameOfDay(date, 2)},
    defaults : () => {return token.replace(/'/g, '')}
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
