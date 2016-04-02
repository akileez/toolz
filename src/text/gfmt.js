// adopted from: gfmt <https://github.com/75lb/gfmt>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

// github-flavoured-markdown table generator.
// Useful in markdown generators or for presenting table data in the terminal.

var contains = require('../array/contains')
var reduce   = require('../array/reduce2')
var forEach  = require('../array/forEach')
var filter   = require('../array/filter')
var some     = require('../array/some')
var map      = require('../array/map')
var keys     = require('../object/keys')
var fill     = require('../string/repeat')
var rpad     = require('../string/pad-right')

/*
    var gfmt = require('gfmt')

    var table = gfmt([
        { "date": "10 Jun 2015", "downloads": 100 },
        { "date": "11 Jun 2015", "downloads": 120 },
        { "date": "12 Jun 2015", "downloads": 150 },
        { "date": "13 Jun 2015", "downloads": 120 },
        { "date": "14 Jun 2015", "downloads": 110 }
    ])

    console.log(table)

    | date        | downloads |
    | ----------- | --------- |
    | 10 Jun 2015 | 100       |
    | 11 Jun 2015 | 120       |
    | 12 Jun 2015 | 150       |
    | 13 Jun 2015 | 120       |
    | 14 Jun 2015 | 110       |
 */

function gfmt (input) {
  var columns
  var data
  var headerRow

  if (Array.isArray(input)) {
    var fieldNames = getUniqueFieldNames(input)
    if (fieldNames.length) {
      fieldNames = filter(fieldNames, function (fieldName) {
        return columnContainsData(input, fieldName)
      })
    }
    columns = map(fieldNames, function (fieldName) {
      var col = {}
      col.field = fieldName
      col.header = fieldName
      col.width = Math.max(String(fieldName).length, getColumnWidth(input, col.field))
      return col
    })
    data = input
  } else {
    columns = map(input.columns, function (col) {
      col.width = col.width || Math.max(String(col.header).length, getColumnWidth(input.data, col.field))
      return col
    })
    data = input.data
  }

  headerRow = reduce(columns, {}, function (prev, column) {
    prev[column.field] = column.header
    return prev
  })

  return getTable(columns, data, headerRow)
}

function getTable (columns, data, headerRow) {
  var headers = createRow(columns, headerRow)
  var headerBorder = createBorder(columns, headerRow)
  var body = reduce(data, '', function (prev, row) {
    return prev + createRow(columns, row)
  })
  return headers + headerBorder + body
}

function createRow (columns, row) {
  return reduce(columns, '', function (prev, column) {
    return prev + '| ' + rpad(typeof row[column.field] === 'undefined' ? '' : row[column.field], column.width) + ' '
  }) + '|\n'
}

function createBorder (columns, row) {
  return reduce(columns, '', function (prev, column) {
    return prev + '| ' + fill('-', column.width) + ' '
  }) + '|\n'
}

function columnContainsData (rows, fieldName) {
  return some(rows, function (row) {
    return row[fieldName] !== null && typeof row[fieldName] !== 'undefined'
  })
}

function getColumnWidth (data, key) {
  return reduce(data, 0, function (prev, row) {
    var width = String(row[key].length)
    if (width > prev) prev = width
    return prev
  })
}

function getUniqueFieldNames (data) {
  return reduce(data, [], function (prev, row) {
    forEach(keys(row), function (field) {
      if (!contains(prev, field)) prev.push(field)
    })
    return prev
  })
}

module.exports = gfmt
