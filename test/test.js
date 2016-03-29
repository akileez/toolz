// use this file to automate the running of tests.
var runr     = require('../task/runr')
var execa    = require('../src/cli/execa-commands')
var spawn    = require('../src/cli/spawn-commands')

function defs () {
  spawn([{cmd: './painless', args: [`spec/**/*.js`]}])
}

function cover () {
  var type = runr.opts.text ? 'text' : 'html'

  spawn([{cmd: 'nyc', args: [
    `--reporter=${type}`,
    `./painless`,
    `spec/**/*.js`
  ]}])
}

function test (dir) {
  execa([{cmd: './painless', args: [`spec/${dir}/*.js`]}], () => {
    if (runr.opts.lint) process.nextTick(() => {
      spawn([{cmd: './painless', args: [`lint/${dir}.js`, '-a']}])
    })
  })
}

runr
  .task('default' , defs)
  .task('arr'     , () => test('array'))
  .task('async'   , () => test('async'))
  .task('func'    , () => test('function'))
  .task('gen'     , () => test('generator'))
  .task('lang'    , () => test('lang'))
  .task('num'     , () => test('number'))
  .task('obj'     , () => test('object'))
  .task('stamp'   , () => test('stamp'))
  .task('cov'     , cover)
