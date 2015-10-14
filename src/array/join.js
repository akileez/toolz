// Joins the strings in arr, inserting separator between each value.

// This ignores null values and empty strings that are in the array.
// separator defaults to an empty string.
// This will convert all non-string objects in the array to a string.

var filter = require('./filter')

function join (items, separator) {
  separator = separator || ''
  return filter(items, isValidString).join(separator)
}

function isValidString (value) {
  // return (value != null && value != '')
  return (value != null)
}

module.exports = join
