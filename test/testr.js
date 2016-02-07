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

runr
  .task('default', arr)
  .task('array', arr)