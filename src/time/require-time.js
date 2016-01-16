/**
 * timeRequire - measure the time to load all the subsequnt modules by hoocking require() calls
 *
 * @author Ciprian Popa (cyparu)
 * @since 0.0.1
 * @version 0.0.1
 */

'use strict'

var requireData = []
var write = process.stdout.write.bind(process.stdout)
var relative = require('path').relative
var cwd = process.cwd()
// require hooker should be first module loaded so all the other requires should count as well
/* jshint -W003 */
var hook = require('./requireHook')(_hooker)
var argv = require('../util/argh').argv
var table = require('../text/text-table')
var dateTime = require('../time/clockin')
var repeat = require('../glob/repeat-string')
var prettyMs = require('./ms')
var clrz = require('../util/colorz')

// extra locals
var DEFAULT_COLUMNS = 80
var BAR_CHAR = process.platform === 'win32' ? '■' : '▇'
var sorted = argv.sorted || argv.s

// TODO - configure threshold using CLI ?
var threshold = (argv.verbose || argv.v) ? 0.0 : 0.001
var EXTRA_COLUMNS = sorted ? 24 : 20

function pad(count, seq) {
  return (count > 1) ? new Array(count).join(seq) : ''
}

function log(str) {
  write(str + '\n', 'utf8')
}

// Callback/listener used by requireHook hook to collect all the modules in their loading order
function _hooker(data) {
  var filename = relative(cwd, data.filename)

  // use the shortest name
  if (filename.length > data.filename) {
    filename = data.filename;
  }

  requireData.push({
    order: requireData.length, // loading order
    time: data.startedIn, // time
    label: data.name + ' (' + filename + ')'
    // name: data.name,
    // filename: filename
  });
}

function formatTable(tableData, totalTime) {
  var NAME_FILE_REX = /(.+)( \(.+\))/;
  var maxColumns = process.stdout.columns || DEFAULT_COLUMNS;
  var validCount = 0;

  var longestRequire = tableData.reduce(function (acc, data) {
    var avg = data.time / totalTime;
    if (avg < threshold) {
      return acc;
    }
    validCount++;
    return Math.max(acc, data.label.length);
  }, 0);

  var maxBarWidth = (longestRequire > maxColumns / 2)
    ? ((maxColumns - EXTRA_COLUMNS) / 2)
    : (maxColumns - (longestRequire + EXTRA_COLUMNS));

  var processedTableData = [];
  var maxOrderChars;
  var counter;

  function shorten(name) {
    var nameLength = name.length
    var partLength
    var start
    var end

    if (name.length < maxBarWidth) {
      return name
    }

    partLength = Math.floor((maxBarWidth - 3) / 2)
    start      = name.substr(0, partLength + 1)
    end        = name.substr(nameLength - partLength)

    return start.trim() + '...' + end.trim()
  }

  function createBar(percentage) {
    var rounded = (percentage * 100).toString().slice(0, 4)
    var bar = repeat(BAR_CHAR, (maxBarWidth * percentage) + 1)

    return (rounded !== 0)
      ? (bar + ' ' + rounded) + '%'
      : '0'
  }

  // sort the data if needed
  if (sorted !== false) {
    tableData.sort(function(e1, e2) {
      return e2.time - e1.time
    })
  }
  // initialize the counter
  counter = 1

  // get num ber of chars for padding
  maxOrderChars = tableData.length.toString().length

  // push the header
  processedTableData.push(['#' + (sorted ? ' [order]' : ''), 'module', 'time', '%'])

  tableData.forEach(function (data) {
    var avg = data.time / totalTime
    var counterLabel
    var label
    var match

    // select just data over the threshold
    if (avg >= threshold) {
      counterLabel = counter++;
      // for sorted collumns show the order loading with padding
      if (sorted) counterLabel += pad(maxOrderChars - data.order.toString().length + 1, ' ')
        + ' [' + data.order + ']'

      label = shorten(data.label)
      match = label.match(NAME_FILE_REX)

      if (match) {
        label = clrz.green(match[1]) + match[2]
      }

      var time = clrz.bold(prettyMs(data.time))
      var color = clrz.green
      if (avg > 0.05) color = clrz.yellow
      if (avg > 0.15) color = clrz.red
      var bar = color(createBar(avg))
      var cl = clrz.gray(counterLabel)

      processedTableData.push([cl, label, time, bar])
    }
  })

  return table(processedTableData, {
    align: ['r', 'l', 'r', 'l'],
    stringLength: function(str) {
      return clrz.strip(str).length
    }
  })
}

// hook process exit to display the report at the end
process.once('exit', function() {
  var startTime = hook.hookedAt
  var totalTime = Date.now() - startTime.getTime()

  var text = 'Start time: '
  text += clrz.yellow('(' + dateTime(startTime) + ')')
  text += ' [threshold=' + (threshold * 100) + '%' + (sorted ? ',sorted' : '') + ']'

  var header = '\n\n' + clrz.underline(text)

  log(header)
  log(formatTable(requireData, totalTime))
  log(clrz.bold('Total require(): ') + clrz.yellow(requireData.length))
  log(clrz.bold('Total time: ') + clrz.yellow(prettyMs(totalTime)))
})
