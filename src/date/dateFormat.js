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
  switch (token) {
    case 'd'     : return date.getDate()
    case 'dd'    : return pad(date.getDate(), 2)
    case 'ddd'   : return nameOfDay(date, 3)
    case 'dddd'  : return nameOfDay(date)
    case 'm'     : return date.getMonth() + 1
    case 'mm'    : return pad(date.getMonth() + 1, 2)
    case 'mmm'   : return nameOfMonth(date, 3)
    case 'mmmm'  : return nameOfMonth(date)
    case 'yyyy'  : return pad(date.getFullYear(), 4)
    case 'yy'    : return pad(date.getFullYear() % 100, 2)
    case 'h'     : return date.getHours() % 12 || 12
    case 'hh'    : return pad(date.getHours() % 12 || 12, 2)
    case 'H'     : return date.getHours()
    case 'HH'    : return pad(date.getHours(),2)
    case 'M'     : return date.getMinutes()
    case 'MM'    : return pad(date.getMinutes(), 2)
    case 'S'     : return date.getSeconds()
    case 'SS'    : return pad(date.getSeconds(),2)
    case 's'     : return date.getMilliseconds()
    case 'ss'    : return pad(date.getMilliseconds(), 3)
    case 't'     : return date.getHours() < 12 ? ' a' : ' p'
    case 'tt'    : return date.getHours() < 12 ? ' am' : ' pm'
    case 'T'     : return date.getHours() < 12 ? ' A' : ' P'
    case 'TT'    : return date.getHours() < 12 ? ' AM' : ' PM'
    case 'N'     : return dayOfTheYear(date)
    case 'W'     : return weekOfTheYear(date)
    case 'Q'     : return quarterOfTheYear(date)
    case 'Z'     : return timezoneOffset(date)
    case 'u'     : return totalDaysThisMonth(date)
    case 'uu'    : return totalDaysThisYear(date)
    case 'x'     : return daysLeftThisWeek(date)
    case 'xx'    : return daysLeftThisMonth(date)
    case 'xxx'   : return daysLeftThisYear(date)
    case 'v'     : return isLeapYear(date)
    case 'o'     : return ordinal(date.getDate())
    case 'O'     : return nameOfDay(date, 1)
    case 'OO'    : return nameOfDay(date, 2)
    default      : return token.replace(/'/g, '')
  }
}

function antiPattern (mask, token) {
  if (!token.test(mask)) return mask
  return false
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
