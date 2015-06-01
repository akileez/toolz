function dayOfTheYear (date) {
  var now = new Date(date.getTime())
  var then = new Date(date.getFullYear(), 0, 1)

  return Math.ceil((now - then) / 86400000)
}

module.exports = dayOfTheYear
