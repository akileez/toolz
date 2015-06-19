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
  if (num > 3) {
    if (name === 'Tuesday') return name.slice(0, 4)
    else if (name === 'Thursday' && num < 6) return name.slice(0, num)
    else return name.slice(0, 3)
  }
  return name.slice(0, num)
}

module.exports = nameOfDay
