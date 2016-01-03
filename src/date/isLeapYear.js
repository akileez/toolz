var isDate = require('../lang/isDate')

function isLeapYear (date) {
  var thisYear = isDate(date)
    ? new Date(date).getFullYear()
    : new Date().getFullYear()

  return thisYear % 400 === 0 || (thisYear % 100 !== 0 && thisYear % 4 === 0)
}

module.exports = isLeapYear
