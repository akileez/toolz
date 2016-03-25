// use this file to automate the running of tests.
var runr     = require('../src/task/runr')
var execa    = require('../src/cli/execa-commands')
var spawn    = require('../src/cli/spawn-commands')
var painless = require('./painless')

function execute (dir) {
  execa([{cmd: './painless', args: [`spec/${dir}/*.js`]}], () => {
    if (runr.opts.lint) process.nextTick(() => {
      spawn([{cmd: './painless', args: [`lint/${dir}.js`, '-a']}])
    })
  })
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
