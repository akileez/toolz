var isDate = require('../lang/isDate')

function isLeapYear (thisYear) {
  if (isDate(thisYear)) thisYear = thisYear.getFullYear()
  return thisYear % 400 === 0 || (thisYear % 100 !== 0 && thisYear % 4 === 0)
}

module.exports = isLeapYear
