var isLeapYear = require('./isLeapYear')

function daysInTheYear (date) {
  var thisYear = new Date(date).getFullYear()
  return isLeapYear(thisYear) ? 366 : 365
}

module.exports = daysInTheYear
