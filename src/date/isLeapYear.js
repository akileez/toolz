var isDate = require('../lang/isDate')

function isLeapYear (date) {
  var thisYear

  if (isDate(date)) thisYear = date.getFullYear()
  else thisYear = new Date().getFullYear()

  return thisYear % 400 === 0 || (thisYear % 100 !== 0 && thisYear % 4 === 0)
}

module.exports = isLeapYear
