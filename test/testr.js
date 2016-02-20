// use this file to automate the running of tests.
var runr     = require('../src/util/runr')
var execa    = require('../src/cli/execa-commands')
var spawn    = require('../src/cli/spawn-commands')
var concur   = require('../src/async/concurrent').each
var glob     = require('../src/glob/globby')
var map      = require('../src/array/map')
var segments = require('../src/path/segments')

function mapr (v, k) {
  return {cmd: 'node', args: [segments.last(v)]}
}

function opts (dir) {
  return {cwd: dir, concurrent: false}
}

function arr () {
  var dir = 'array'
  var files = map(glob.sync(['array/*.js', '!array/lint*.js']), mapr)

  // console.log(files)

  concur([
    // execute tests
    execa(files, opts(dir)),
    // lint files
    spawn([{cmd: 'node', args: ['lint.js', '-a']}], opts(dir))
  ], () => {
    // noop
  })
}

function async1 () {
  var dir = 'async'
  var files = map(glob.sync(['async/*.js', '!async/lint*.js']), mapr)
  execa(files, opts(dir))
}

function func () {
  var dir = 'function'
  var files = map(glob.sync(['function/*.js', '!function/lint*.js']), mapr)
  execa(files, opts(dir))
}

function lang () {
  var dir = 'lang'
  var files = map(glob.sync(['lang/*.js', '!lang/lint*.js']), mapr)
  execa(files, opts(dir))
}

function num () {
  var dir = 'number'
  var files = map(glob.sync(['number/*.js', '!number/lint*.js']), mapr)
  execa(files, opts(dir))
}

function obj () {
  var dir = 'object'
  var files = map(glob.sync(['object/*.js', '!object/lint*.js']), mapr)
  execa(files, opts(dir))
}

function stamp () {
  var dir = 'stamp'
  var files = map(glob.sync(['stamp/basic*.js', '!stamp/lint*.js']), mapr)
  execa(files, opts(dir))
}

function lint () {
  spawn([
    {cmd: 'node', args: ['lint.js', '-a']}
  ], {cwd: 'array', concurrent: true})
}

function defs () {
  arr()
  async1()
  func()
  lang()
  num()
  obj()
  stamp()
}

function all () {
  defs()
  lint()
}

runr
  .task('default', defs)
  .task('arr', arr)
  .task('async', async1)
  .task('func', func)
  .task('lang', lang)
  .task('num', num)
  .task('obj', obj)
  .task('stamp', stamp)
  .task('lint', lint)
  .task('all', all)
