function daysInMonth () {
  return new Date(year, month, 0).getDate()
}

module.exports = daysInMonth
