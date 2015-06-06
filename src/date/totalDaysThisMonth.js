function daysInMonth (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1

  return new Date(year, month, 0).getDate()
}

module.exports = daysInMonth
