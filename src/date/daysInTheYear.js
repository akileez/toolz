var isLeapYear = require('./isLeapYear')

function daysInTheYear (thisYear) {
  return isLeapYear(thisYear) ? 366 : 365
}

module.exports = daysInTheYear
