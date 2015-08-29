var UNDEF

// Parses string and convert it into a native value.

function typecast (value) {
  var results
  if (value === null || value === 'null') results = null
  else if (value === 'true') results = true
  else if (value === 'false') results = false
  else if (value === UNDEF || value === 'undefined') results = UNDEF
  else if (value === '' || isNaN(value)) results = value  // isNaN('') returns false
  else results = parseFloat(value)  // parseFloat(null || '') returns NaN

  return results
}

module.exports = typecast
