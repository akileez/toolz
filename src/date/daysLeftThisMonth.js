var totalDaysThisMonth = require('./totalDaysThisMonth')

function daysLeftThisMonth (date) {
  return totalDaysThisMonth(date) - date.getDate()
}

module.exports = daysLeftThisMonth
