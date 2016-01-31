// adopted from: https://github.com/sindresorhus/strip-json-comments
// Copyright Sindre Sorhus (MIT)

var singleComment = 1
var multiComment  = 2

function stripWithoutWhitespace () {
  return ''
}

function stripWithWhitespace (str, start, end) {
  return str.slice(start, end).replace(/\S/g, ' ')
}

function stripJSON (str, opts) {
  opts = opts || {}

  var currentChar
  var nextChar
  var insideString = false
  var insideComment = false
  var offset = 0
  var ret = ''
  var strip = opts.whitespace === false ? stripWithoutWhitespace : stripWithWhitespace
  var i = -1
  var len = str.length

  while (++i < len) {
    currentChar = str[i]
    nextChar = str[i + 1]

    if (!insideComment && currentChar === '"') {
      var escaped = str[i - 1] === '\\' && str[i - 2] !== '\\'
      if (!escaped) insideString = !insideString
    }

    if (insideString) {
      continue
    }

    if (!insideComment && currentChar + nextChar === '//') {
      ret += str.slice(offset, i)
      offset = i
      insideComment = singleComment
      i++
    } else if (insideComment === singleComment && currentChar + nextChar === '\r\n') {
      i++
      insideComment = false
      ret += strip(str, offset, i)
      offset = i
      continue
    } else if (insideComment === singleComment && currentChar === '\n') {
      insideComment = false
      ret += strip(str, offset, i)
      offset = i
    } else if (!insideComment && currentChar + nextChar === '/*') {
      ret += str.slice(offset, i)
      offset = i
      insideComment = multiComment
      i++
      continue
    } else if (insideComment === multiComment && currentChar + nextChar === '*/') {
      i++
      insideComment = false
      ret += strip(str, offset, i + 1)
      offset = i + 1
      continue
    }
  }

  // remove new line character when proceeded by one or more spaces
  // return ret.replace(/( ){1,}(\r\n|\n){1,}/g, '')
  return ret + str.substr(offset)
}

module.exports = stripJSON
