// use this file to automate the running of tests.
var runr = require('../src/util/runr')
var execa = require('../src/cli/execa-commands')

function lint () {
  execa({
    lint: {cmd: 'eslint', args: ['*.js']}
  }, {cwd: '../src/array'})
}

function arr () {
  execa({
    cmd1: {cmd: 'node', args: ['append.js']},
    cmd2: {cmd: 'node', args: ['collect.js']},
    cmd3: {cmd: 'node', args: ['combine.js']},
    cmd4: {cmd: 'node', args: ['compact.js']},
    cmd5: {cmd: 'node', args: ['contains.js']},
    cmd6: {cmd: 'node', args: ['convert.js']},
    cmd7: {cmd: 'node', args: ['difference.js']},
    cmd7: {cmd: 'node', args: ['equals.js']},
    cmd7: {cmd: 'node', args: ['every.js']}
  }, {cwd: 'array'})
}

function lang () {
  execa({
    cmd1: {cmd: 'node', args: ['clone.js']},
    cmd2: {cmd: 'node', args: ['kind.js']}
  }, {cwd: 'lang'})
}

function num () {
  execa({
    cmd1: {cmd: 'node', args: ['humanize.js']}
  }, {cwd: 'number'})
}

function obj () {
  execa({
    cmd1: {cmd: 'node', args: ['dotPath.js']},
    cmd2: {cmd: 'node', args: ['merge.js']}
  }, {cwd: 'object'})
}

function stamp () {
  execa({
    cmd1: {cmd: 'node', args: ['basic-init.js']},
    cmd2: {cmd: 'node', args: ['basic-methods.js']},
    cmd3: {cmd: 'node', args: ['basic-props.js']},
    cmd4: {cmd: 'node', args: ['basic-refs.js']},
    cmd5: {cmd: 'node', args: ['basic-statics.js']}
  }, {cwd: 'stamp'})
}

function defs () {
  arr()
  lang()
  num()
  obj()
  stamp()
}

runr
  .task('default', defs)
  .task('arr', arr)
  .task('lang', lang)
  .task('num', num)
  .task('obj', obj)
  .task('stamp', stamp)
  .task('lint', lint)
