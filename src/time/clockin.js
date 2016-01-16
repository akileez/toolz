/*!
 * clockin <https://github.com/akileez/clockin>
 *
 * Copyright (c) 2015 Keith Williams.
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

var cal = {
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  mons: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

module.exports = function (date, mask) {
  if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
    mask = date
    date = undefined
  }
  // console.log(/\d/.test(date))
  date = date || new Date
  // console.log('date: ', date)
  if (date instanceof Date) date = new Date(date)
  else date = new Date(Date.parse(date))
  if (isNaN(date)) throw TypeError('Invalid date')

  var thisday = date.getDay()
  var thismonth = date.getMonth()
  var thisyear = date.getFullYear()

  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = thisyear.toString()
  var hours = date.getHours()
  var hr = hours % 12 || 12
  var mins = date.getMinutes()
  var secs = date.getSeconds()
  var ms = date.getMilliseconds()

  var offset = date.getTimezoneOffset()
  var GMT = (offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4)

  var ordinal = day + ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : (day % 100 - day % 10 != 10) * day % 10]

  var dayNames = cal.days.filter(dayOfWeek).toString()
  var monNames = cal.mons.filter(monthOfYear).toString()
  var thisweek = getWeek()
  var thisquarter = getQuarter()
  var daythisyear = getDayNumOfYear()
  var daysthisyear = daysInYear()
  var daysthismonth = daysInMonth()
  var daysleftthisweek = daysLeftThisWeek()
  var daysleftthismonth = daysLeftThisMonth()
  var daysleftthisyear = daysLeftThisYear()

  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMSsTt])\1?|[LloOZWQNv]|u{1,2}|x{1,3}|'[^']*'/g
  var flags = {
    d        : day,
    dd       : pad(day),
    ddd      : dayNames.slice(0, 3),
    dddd     : dayNames,
    m        : month,
    mm       : pad(month),
    mmm      : monNames.slice(0, 3),
    mmmm     : monNames,
    yyyy     : year,
    yy       : year.slice(2),
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

  mask = String(frmt[mask] || mask || frmt.default)
  // process.stdout.write('mask: ' + mask + '  ')
  return mask.replace(token, function (match) {
    if (match in flags) return flags[match]
    return match.slice(1, match.length - 1)
  })

  function monthOfYear (val, idx, arr) {
    if (idx === thismonth) return val
  }

  function dayOfWeek (val, idx, arr) {
    if (idx === thisday) return val
  }

  function getWeek() {
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

  // testing new quarter calculation.
  function getQuarter () {
    return (Math.ceil(month / 3))
  }

  function isLeapYear () {
    return thisyear % 400 === 0 || (thisyear % 100 !== 0 && thisyear % 4 === 0)
  }

  function daysInMonth () {
    return new Date(year, month, 0).getDate()
  }

  function daysInYear () {
    return isLeapYear(thisyear) ? 366 : 365
  }

  function daysLeftThisWeek () {
    return 6 - thisday
  }

  function daysLeftThisMonth () {
    return daysInMonth() - day
  }

  function daysLeftThisYear () {
    return daysthisyear - daythisyear
  }

  function getDayNumOfYear () {
    var now = new Date(date.getTime())
    var then = new Date(date.getFullYear(), 0, 1)

    return Math.ceil((now - then) / 86400000)
  }

  function pad (val, len) {
    val = String(val)
    len = len || 2
    while (val.length < len) {
      val = '0' + val
    }
    return val
  }

  function kindOf(val) {
    if (val === null) {
      return 'null'
    }

    if (val === undefined) {
      return 'undefined'
    }

    if (typeof val !== 'object') {
      return typeof val
    }

    if (Array.isArray(val)) {
      return 'array'
    }

    return {}.toString.call(val)
      .slice(8, -1).toLowerCase()
  }
}