// adopted from: command-line-usage <https://github.com/75lb/command-line-usage>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

// Still a WIP.
// make an option for no colors

var columnLayout  = require('./columns')
var colorize      = require('./colorize')
var arrayify      = require('../lang/toArray')
var isPlainObject = require('../lang/isPlainObject')
var isObject      = require('../lang/isObject')
var isString      = require('../lang/isString')
var filter        = require('../array/filter')
var forEach       = require('../array/forEach')
var contains      = require('../array/contains')
var where         = require('../array/where')
var each          = require('../object/foreach')

function getUsage (defs, opts) {
  opts = defaultOpts(opts)
  defs = defs || []

  // filter out hidden definitions
  if (opts.hide && opts.hide.length) {
    // ES6 version:
    // defs = filter(defs, (option) => !contains(opts.hide, option.name))
    defs = filter(defs, function (opt) {
      return !contains(opts.hide, opt.name)
    })
  }

  var lines = []
  addEmpty(lines)

  if (opts.title) {
    addLine(lines, getText(opts.title, ['cyan', 'bold']))
  }

  // is this needed yet?
  // var output = rendr(lines)

  if (opts.description) {
    // lines = []
    forEach(arrayify(opts.description), function (desc) {
      addLine(lines, desc)
    })
    // addEmpty(lines)
    // output += rendr(lines)
  }

  if (opts.title || opts.description) addEmpty(lines)

  if (opts.synopsis) {
    opts.synopsis = arrayify(opts.synopsis)
    addLine(lines, colorize('Synopsis', ['underline', 'bold']))
    addEmpty(lines)

    forEach(opts.synopsis, function (form) {
      addLine(lines, getText(form))
    })

    addEmpty(lines)
    // output += rendr(lines)
  }

  if (defs.length) {
    if (opts.groups) {
      each(opts.groups, function (val, group) {
        var title
        var description
        if (isObject(val)) {
          title = val.title
          description = val.description
        } else if (typeof val === 'string') {
          title = val
        } else {
          throw new Error('Unexpected group config structure')
        }
        addLine(lines, getText(title, ['underline', 'bold']))
        addEmpty(lines)
        if (description) {
          addLine(lines, getText(description))
          addEmpty(lines)
        }
        if (group === '_none') {
          forEach(where(defs, {group: undefined}), function (v) {
            addRow(lines, v)
          })
        } else {
          forEach(where(defs, {'+group': group}), function (v) {
            addRow(lines, v)
          })
        }

        addEmpty(lines)
      })
    } else {
      each(defs, function (v) {
        addRow(lines, v)
      })
      addEmpty(lines)
    }
    // output += rendr(lines)
  }

  if (opts.examples) {
    addLine(lines, colorize('Examples', ['underline', 'bold']))
    forEach(arrayify(opts.examples), function (v) {
      addLine(lines, v)
      addEmpty(lines)
    })
  }

  if (opts.footer) {
    forEach(arrayify(opts.footer), function (v) {
      // console.log('lines: ', lines, 'prop-v:', v)
      addLine(lines, v)
    })
    addEmpty(lines)
    // output += rendr(lines)
  }

  // the footer adds an empty line - remove it if one-too-many
  output = rendr(lines, opts).replace(/\n\s*\n$/, '\n')
  return output
}

function getOptionNames (cliOption, optionNameStyles) {
  var names = []
  var type = cliOption.type ? cliOption.type.name.toLowerCase() : ''
  // console.log('type of option name: ', type)
  var multiple = cliOption.multiple ? ', ...' : ''

  if (type === 'boolean') type = ''
  else type = '<' + type + multiple + '>'

  type = colorize(cliOption.typeLabel || type, ['dim', 'black']) // cliOption.typeLabel ||

  if (cliOption.alias) names.push(colorize('-' + cliOption.alias, optionNameStyles))
  names.push(colorize('--' + cliOption.name, optionNameStyles) + ' ' + type)
  return names.join(', ')
}

function getText (text, styleArray) {
  if (isString(text)) {
    return colorize(text, styleArray)
  } else if (isPlainObject(text)) {
    return colorize(text.text, text.format || styleArray)
  }
}

function addLine (lines, line) {
  // lines must be an array
  if (isPlainObject(line)) {
    var prop
    for (prop in line) {
      // will need to reformat this!!!
      line[prop] = colorize(line[prop])
    }
    lines.push(line)
  } else {
    // console.log('this is the line: ', line)
    lines.push(typeof line === 'string' ? getText(line) : '')
  }
}

function addRow (lines, definition) {
  // console.log('lines: ', lines, 'definition: ', definition)
  lines.push({
    col1: getOptionNames(definition, ['bold', 'magenta']),
    col2: getText(definition.description)
  })
}

function addEmpty (lines) {
  lines.push('')
}

function rendr (lines, opts) {
  return columnLayout(lines, {
    viewWidth: opts.viewWidth || process.stdout.columns,
    padding: {
      left: '  ',
      right: ' '
    },
    columns: [
      {name: 'col1', nowrap: true},
      {name: 'col2', maxWidth: 80}
    ]
  })
}

function defaultOpts (opts) {
  opts             = opts || {}
  opts.title       = opts.title || ''
  opts.description = opts.description || ''
  opts.synopsis    = opts.synopsis
    || opts.usage && opts.usage.forms
    || opts.forms
    || ''
  opts.groups      = opts.groups || ''
  opts.examples    = opts.examples | ''
  opts.footer      = opts.footer || ''
  opts.hide        = arrayify(opts.hide) || []

  return opts
}

module.exports = getUsage
