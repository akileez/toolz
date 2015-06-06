var monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function nameOfMonth (date, n) {
  thismonth = date.getMonth()
  var name = monthNames.filter(monthOfYear).toString()

  if (n == null) return name
  else return abbreviateName(name, n)
}

function monthOfYear (val, idx, arr) {
    if (idx === thismonth) return val
  }

function abbreviateName (name, num) {
  if (num > 3) num = 3
  return name.slice(0, num)
}

module.exports = nameOfMonth
