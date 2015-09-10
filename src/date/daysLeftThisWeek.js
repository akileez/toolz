function daysLeftThisWeek (date) {
  return 6 - date.getDay()
}

module.exports = daysLeftThisWeek
