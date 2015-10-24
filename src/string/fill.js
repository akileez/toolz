// from fill [string-tools] <https://github.com/75lb/string-tools>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

// Create a new string filled with the supplied character

function fill (str, len) {
  var buffer = new Buffer(len)
  buffer.fill(str)
  return buffer.toString()
}

module.exports = fill
