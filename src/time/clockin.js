/*!
 * clockin <https://github.com/akileez/clockin>
 *
 * Copyright (c) 2015-2016 Keith Williams.
 * Licensed under the ISC license.
 */

var frmt = {
  'default'             : 'ddd mmm dd yyyy HH:MM:SS',
  'now'                 : 'dddd, mmmm o, yyyy HH:MM:SS \'GMT\'Z',
  'shortDate'           : 'm/d/yy',
  'mediumDate'          : 'mmm d, yyyy',
  'longDate'            : 'mmmm d, yyyy',
  'fullDate'            : 'dddd, mmmm d, yyyy',
  'shortTime'           : 'h:MM TT',
  'mediumTime'          : 'h:MM:SS TT',
  'longTime'            : 'h:MM:SS TT Z',
  'isoDate'             : 'yyyy-mm-dd',
  'isoTime'             : 'HH:MM:SS',
  'iso'                 : 'yyyy-mm-dd\'T\'HH:MM:SSZ',
  'isoDateTime'         : 'yyyy-mm-dd\'T\'HH:MM:SS:ss',
  'isoUtcDateTime'      : 'yyyy-mm-dd\'T\'HH:MM:SS\'Z\'',
  'expiresHeaderFormat' : 'ddd, dd mmm yyyy HH:MM:SS Z',
  'timestamp'           : 'yyyymmddHHMMSSss'
}

var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function clockin (date, mask) {
  if (arguments.length === 1 && typeof date === 'string' && !/\d/.test(date)) {
    mask = date
    date = undefined
  }
  // console.log(/\d/.test(date))
  date = date || new Date
  // console.log('date: ', date)
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
      t     : () => date.getHours() < 12 ? 'a' : 'p',
      tt    : () => date.getHours() < 12 ? 'am' : 'pm',
      T     : () => date.getHours() < 12 ? 'A' : 'P',
      TT    : () => date.getHours() < 12 ? 'AM' : 'PM',
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

  function nameOfDay (date, n) {
    var thisday = date.getDay()
    var name = dayNames.filter(dayOfWeek).toString()

    function dayOfWeek (val, idx, arr) {
      if (idx === thisday) return val
    }

    if (n == null) return name
    else return abbreviateDayName(name, n)

    function abbreviateDayName (name, num) {
      if (num > 3) {
        if (name === 'Tuesday') return name.slice(0, 4)
        else if (name === 'Thursday' && num < 6) return name.slice(0, num)
        else return name.slice(0, 3)
      }
      return name.slice(0, num)
    }
  }

  function nameOfMonth (date, n) {
    var thismonth = date.getMonth()
    var name = monthNames.filter(monthOfYear).toString()

    function monthOfYear (val, idx, arr) {
      if (idx === thismonth) return val
    }

    if (n == null) return name
    else return abbreviateName(name, n)

    function abbreviateName (name, num) {
      if (num > 3) num = 3
      return name.slice(0, num)
    }
  }

  function dayOfTheYear (date) {
    // var now = new Date(date.getTime())
    // var then = new Date(date.getFullYear(), 0, 1)

    var now = date.getTime()
    var then = new Date(date.getFullYear(), 0, 1)

    return Math.ceil((now - then) / 86400000)
  }

  function weekOfTheYear () {
    // Remove time components of date
    var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    // Change date to Thursday same week
    targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3)

    // Take January 4th as it is always in week 1 (see ISO 8601)
    var firstThursday = new Date(targetThursday.getFullYear(), 0, 4)

    // Change date to Thursday same week
    firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3)

    // Check if daylight-saving-time-switch occured and correct for it
    var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset()
    targetThursday.setHours(targetThursday.getHours() - ds)

    // Number of weeks between target Thursday and first Thursday
    var weekDiff = (targetThursday - firstThursday) / (86400000*7)
    return 1 + Math.floor(weekDiff)
  }

  function quarterOfTheYear (date) {
    var month = date.getMonth() + 1
    return (Math.ceil(month / 3))
  }

  function timezoneOffset (date) {
    var offset = date.getTimezoneOffset()
    var abs = Math.abs(offset)
    var hr = pad(Math.floor(abs / 60), 2)
    var min = pad(abs % 60, 2)
    return [(offset > 0 ? '-' : '+'), hr, min].join('')
  }

  function totalDaysThisMonth (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1

    return new Date(year, month, 0).getDate()
  }

  function totalDaysThisYear (date) {
    var thisYear = new Date(date).getFullYear()
    return isLeapYear(thisYear) ? 366 : 365
  }

  function isLeapYear (date) {
    var thisYear = isDate(date)
      ? new Date(date).getFullYear()
      : new Date().getFullYear()

    return thisYear % 400 === 0 || (thisYear % 100 !== 0 && thisYear % 4 === 0)
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

  function ordinal (n) {
    n = toInt(n)
    return n + nth(n)
  }

  function nth (i) {
    return ['th', 'st', 'nd', 'rd'][i % 10 > 3 ? 0 : (i % 100 - i % 10 !== 10) * i % 10]
  }

  function toInt (val) {
    return ~~val
  }

  function isDate (value) {
    return Object.prototype.toString.call(value) === '[object Date]'
  }

  function pad (val, len) {
    val = String(val)
    len = len || 2
    while (val.length < len) {
      val = '0' + val
    }
    return val
  }
}

module.exports = clockin
