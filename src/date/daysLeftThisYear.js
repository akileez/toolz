var totalDaysThisYear = require('./totalDaysThisYear')
var dayOfTheYear = require('./dayOfTheYear')

function daysLeftThisYear (date) {
  return totalDaysThisYear(date) - dayOfTheYear(date)
}

module.exports = daysLeftThisYear
