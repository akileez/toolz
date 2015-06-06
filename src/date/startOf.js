var clone = require('../lang/clone')

// get a new Date object representing the start of a period

function startOf (date, period) {
  date = clone(date)

  // intentionally removed break from switch since start of
  // month/year/etc should also reset the following periods
  switch (period) {
    case 'year'   : date.setMonth(0)   // falls through
    case 'month'  : date.setDate(1)    // falls through
    case 'week'   :
    case 'day'    : date.setHours(0)   // falls through
    case 'hour'   : date.setMinutes(0) // falls through
    case 'minute' : date.setSeconds(0) // falls through
    case 'second' : date.setMilliseconds(0)
                    break
    default       : throw new Error('"'+ period +'" is not a valid period')
  }

  // week is the only case that should reset the weekDay and maybe
  // even overflow to previous month
  if (period === 'week') {
    var weekDay = date.getDay()
    var baseDate = date.getDate()
    if (weekDay) {
      if (weekDay >= baseDate) date.setDate(0)
      date.setDate(date.getDate() - date.getDay())
    }
  }
  return date
}

module.exports = startOf
