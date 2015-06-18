var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function nameOfDay (date, n) {
  var thisday = date.getDay()
  var name = dayNames.filter(dayOfWeek).toString()

  function dayOfWeek (val, idx, arr) {
    if (idx === thisday) return val
  }

  if (n == null) return name
  else return abbreviateName(name, n)
}

function abbreviateName (name, num) {
  if (num > 3) num = 3
  return name.slice(0, num)
}

module.exports = nameOfDay
