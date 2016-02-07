// use this file to automate the running of tests.
var runr = require('../src/util/runr')
var execa = require('../src/cli/execa-commands')

function arr () {
  execa({
    cmd1: {cmd: 'node', args: ['append.js']},
    cmd2: {cmd: 'node', args: ['collect.js']},
    cmd3: {cmd: 'node', args: ['combine.js']},
    cmd4: {cmd: 'node', args: ['compact.js']},
    cmd5: {cmd: 'node', args: ['contains.js']},
    cmd6: {cmd: 'node', args: ['convert.js']},
    cmd7: {cmd: 'node', args: ['difference.js']}
  }, {cwd: 'array'})
}

function lang () {
  execa({
    cmd1: {cmd: 'node', args: ['clone.js']},
    cmd2: {cmd: 'node', args: ['kind.js']}
  }, {cwd: 'lang'})
}

function obj () {
  execa({
    cmd1: {cmd: 'node', args: ['dotPath.js']},
    cmd2: {cmd: 'node', args: ['merge.js']}
  }, {cwd: 'object'})
}

function defs () {
  arr()
  lang()
  obj()
}

runr
  .task('default', defs)
  .task('arr', arr)
  .task('lang', lang)
  .task('obj', obj)
