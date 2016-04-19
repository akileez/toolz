var assign = require('../object/assign')
var stringWidth = require('../string/string-width')
var concat = Array.prototype.concat
// var concat = require('../array/append')
var map = require('../array/map')
var filter = require('../array/filter')
var apply = require('../function/apply')
var reduce = require('../array/reduce')

var defaults = {
  character : ' ',
  newline   : '\n',
  padding   : 2,
  width     : 0
}

function stripAnsi (str) {
  return typeof str === 'string' ? str.replace(ansiRegex(), '') : str
}

function ansiRegex () {
  return /\u001b\[(?:[0-9]{1,3}(?:;[0-9]{1,3})*)?[m|K]/g
}

function byPlainText(a, b) {
  return stripAnsi(a) > stripAnsi(b) ? 1 : -1
}

function makeArray() {
  return []
}

function makeList(count) {
  return apply(Array, null, Array(count))
  // return Array.apply(null, Array(count))
}

function padCell(fullWidth, character, value) {
  var valueWidth = stringWidth(value)
  var filler = makeList(fullWidth - valueWidth + 1)

  return value + filler.join(character)
}

function toRows(rows, cell, i) {
  rows[i % rows.length].push(cell)

  return rows
}

function toString(arr) {
  return arr.join('')
}

function columns(values, options) {
  values = apply(concat, [], values)
  // values = concat.apply([], values);
  options = assign({}, defaults, options);

  var cells = map(filter(values, Boolean), String).sort(byPlainText)
  // var cells = values
  //   .filter(Boolean)
  //   .map(String)
  //   .sort(byPlainText)

  var termWidth = options.width || process.stdout.columns
  var cellWidth = Math.max.apply(null, cells.map(stringWidth)) + options.padding
  var columnCount = Math.floor(termWidth / cellWidth) || 1
  var rowCount = Math.ceil(cells.length / columnCount) || 1

  if (columnCount === 1) {
    return cells.join(options.newline)
  }

  // of course the commentted out code is very much more readable.
  // just wanted to string together a bunch of functions because I could
  // and ensure all is working well within the library.

  return map(reduce(map(cells, padCell.bind(null, cellWidth, options.character)), toRows, map(makeList(rowCount), makeArray)), toString)
    .join(options.newline)

  // return cells
  //   .map(padCell.bind(null, cellWidth, options.character))
  //   .reduce(toRows, makeList(rowCount).map(makeArray))
  //   .map(toString)
  //   .join(options.newline)
}

module.exports = columns
