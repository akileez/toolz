// use this file to automate the running of tests.
var runr     = require('./src/task/runr')
var execa    = require('./src/cli/execa-commands')
var spawn    = require('./src/cli/spawn-commands')
var concur   = require('./src/async/concurrent').each
var painless = require('./src/bin/painless')

function execute (dir) {
  execa([{cmd: './src/bin/painless', args: [`test/${dir}/*.js`]}])
}

function arr () {
  execute('array')
}

function async1 () {
  execute('async')
}

function func () {
  execute('function')
}

function gen () {
  execute('generator')
}

function lang () {
  execute('lang')
}

function num () {
  execute('number')
}

function obj () {
  execute('object')
}

function stamp () {
  execute('stamp')
}

function lint () {
  spawn([
    {cmd: 'node', args: ['lint.js', '-a']}
  ], {cwd: 'array', concurrent: true})

  // spawn([
  //   {cmd: 'node', args: ['lint.js', '-a']}
  // ], {cwd: 'lang', concurrent: true})
}

function defs () {
  arr()
  async1()
  func()
  gen()
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
  .task('default' , defs)
  .task('arr'     , arr)
  .task('async'   , async1)
  .task('func'    , func)
  .task('gen'     , gen)
  .task('lang'    , lang)
  .task('num'     , num)
  .task('obj'     , obj)
  .task('stamp'   , stamp)
  .task('lint'    , lint)
  .task('all'     , all)
