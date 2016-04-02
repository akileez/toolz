// adopted from: column-layout <https://github.com/75lb/column-layout> v1.05
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

var wrap        = require('./wordwrap')
var padRight    = require('../string/pad-right')
var extend      = require('../object/extend')
var foreach     = require('../object/forEach')
var forEach     = require('../array/forEach')
var filter      = require('../array/filter')
var reduce      = require('../array/reduce2')
var map         = require('../array/map')
var contains    = require('../array/contains')
var without     = require('../array/without')
var pluck       = require('../array/pluck')
var findWhere   = require('../array/findWhere')
var isObject    = require('../lang/isObject')
var isUndefined = require('../lang/isUndefined')
var ansiEscSeq  = require('../regex/rex-ansiEscape')
var where       = require('../array/where')

function columnLayout (data, options) {
  options = extend({
    viewWidth: 100,
    padding: {
      left: ' ',
      right: ' '
    }
  }, options)

  // split input into data and options
  if (!Array.isArray(data)) {
    if (data.options && data.data) {
      options = extend(data.options, options)
      data = data.data
    } else {
      throw new Error('Invalid input data')
    }
  }

  if (!options.columns) options.columns = []

  // get rows which require column layout
  var rows = filter(data, function (row) {
    return isObject(row)
  })

  // if no column options supplied, create them...
  var uniquePropertyNames = getUniquePropertyNames(rows)
  var columnsWithoutOptions
    = without(uniquePropertyNames, pluck(options.columns, 'name'))

  forEach(columnsWithoutOptions, function (columnName) {
    options.columns.push(createColumnOption(columnName))
  })

  // for `nowrap` columns, or columns with no specific width, set the width
  // to the content width
  forEach(options.columns, function (columnOption) {
    if (typeof columnOption.width === 'undefined' || columnOption.nowrap) {
      columnOption = autosizeColumn(rows, columnOption, options)
    }
    return columnOption
  })

  var totalContentWidth = sum(options.columns, 'width')
  var widthDiff = totalContentWidth - options.viewWidth

  // make adjustments if the total width is above the available width
  if (widthDiff > 0) autosizeColumnWidths(options, rows)

  var dataSplit = map(data, renderRow.bind(null, options, uniquePropertyNames))

  return reduce(dataSplit, '', function (output, row) {
    output += mergeArrays(row).join('\n') + '\n'
    return output
  })
}

function getLongestItem (array) {
  return reduce(array, 0, function (longest, item) {
    var itemLength = 0
    if (Array.isArray(item)) itemLength = item.length
    else {
      item = String(item)
      itemLength = removeUnprintable(item).length
    }

    if (itemLength > longest) longest = itemLength
    return longest
  })
}

function mergeArrays (arrays) {
  return reduce(arrays, null, function (merged, array) {
    if (merged === null) merged = array
    else {
      merged = map(merged, function (item, index) {
        return item + array[index]
      })
    }
    return merged
  })
}

function getUniquePropertyNames (rows) {
  return reduce(rows, [], function (keys, row) {
    for (var key in row) {
      if (row.hasOwnProperty(key)) {
        if (!contains(keys, key)) keys.push(key)
      }
    }
    return keys
  })
}

function sum (array, property) {
  return reduce(array, 0, function (total, item) {
    return total + Number(property ? item[property] : item)
  })
}

function getWrappableColumns (rows, columnOptions) {
  var wrappableColumns = columnsContaining(rows, /\s+/)

  return filter(wrappableColumns, function (wrappableCol) {
    var columnOption = getColumnOption(columnOptions, wrappableCol)
    return !(columnOption.nowrap || !columnOption._auto)
  })
}

function getUnWrappableColumns (rows, columnOptions) {
  return without(pluck(columnOptions, 'name'), getWrappableColumns(rows, columnOptions))
}

function getCellLines (options, row, columnName) {
  var cellValue = row[columnName]
  var width = getColumnOption(options.columns, columnName).width
  cellValue = String(isUndefined(cellValue) || cellValue === null ? '' : cellValue)
  cellValue = wrap(cellValue, {
    width: width - getPaddingWidth(options),
    ignore: ansiEscSeq
  })

  var cellLines = map(cellValue.split(/\n/), padCell.bind(null, options, width))
  return cellLines
}

function renderRow (options, uniquePropertyNames, row) {
  // treat null values like an empty string
  if (row == null) row = ''
  if (typeof row === 'string') {
    return [[options.padding.left + row]]
  } else {
    // create a cellLine array for each column
    var cellLinesRow = map(uniquePropertyNames, getCellLines.bind(null, options, row))

    // ensure each cellLines array has the same amount of lines
    if (cellLinesRow.length > 1) {
      var mostLines = getLongestItem(cellLinesRow)
      cellLinesRow = map(cellLinesRow, function (cellLines, index) {
        var columnOption = getColumnOption(options.columns, Object.keys(row)[index])
        var width = columnOption ? columnOption.width : 0

        for (var i = 0; i < mostLines; i++) {
          if (isUndefined(cellLines[i])) cellLines.push(padCell(options, width, ''))
        }
        return cellLines
      })
    }
    return cellLinesRow
  }
}

function padCell (options, width, value) {
  var lengthDiff = value.length - removeUnprintable(value).length
  return options.padding.left + padRight(value, width - getPaddingWidth(options) + lengthDiff) + options.padding.right
}

function autosizeColumnWidths (options, data) {
  var wrappableColumns = getWrappableColumns(data, options.columns)
  var unWrappableColumns = getUnWrappableColumns(data, options.columns)
  var totalWidthOfUnwrappableColumns = sum(
      where(options.columns, map(unWrappableColumns, function (colName) {
        return {
          name: colName
        }
      })),
      'width')
  var remainingWidth = options.viewWidth - totalWidthOfUnwrappableColumns
  var reductionShare = Math.floor(remainingWidth / wrappableColumns.length)

  forEach(wrappableColumns, function (columnName) {
    getColumnOption(options.columns, columnName).width = reductionShare
  })
}

function autosizeColumn (rows, columnOption, options) {
  var columnValues = pluck(rows, columnOption.name)
  columnOption.width = getLongestItem(columnValues) + getPaddingWidth(options)
  columnOption._auto = true
  return columnOption
}

function getPaddingWidth (options) {
  return options.padding.left.length + options.padding.right.length
}

function createColumnOption (name) {
  return {
    name: name
  }
}

function getColumnOption (columnOptions, columnName) {
  var columnOption = findWhere(columnOptions, {name: columnName})
  return columnOption
}

function columnsContaining (rows, test) {
  return reduce(rows, [], function (columns, row) {
    foreach(row, function (val, key) {
      if (test.test(String(val).trim())) {
        if (!contains(columns, key)) columns.push(key)
      }
    })
    return columns
  })
}

function removeUnprintable (str) {
  return str.replace(ansiEscSeq, '')
}

module.exports = columnLayout
