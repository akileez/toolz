// use this file to automate the running of tests.
var runr     = require('../task/runr')
var spawn    = require('../src/cli/spawn-commands')

function defs () {
  spawn([{cmd: './painless', args: ['spec/**/*.js']}])
}

function cover () {
  var type = runr.opts.text ? 'text' : 'html'

  spawn([{cmd: 'nyc', args: [
    `--reporter=${type}`,
    './painless',
    'spec/**/*.js'
  ]}])
}

function test (dir) {
  if (runr.opts.lint) {
    spawn([{cmd: './painless', args: [`lint/${dir}.js`, '-a']}], () => {
      process.nextTick(() => {
        spawn([{cmd: './painless', args: [`spec/${dir}/*.js`]}])
      })
    })
  } else {
    spawn([{cmd: './painless', args: [`spec/${dir}/*.js`]}])
  }
}

runr
  .task('default', defs)
  .task('arr',     () => test('array'))
  .task('async',   () => test('async'))
  .task('func',    () => test('function'))
  .task('gen',     () => test('generator'))
  .task('lang',    () => test('lang'))
  .task('num',     () => test('number'))
  .task('obj',     () => test('object'))
  .task('path',    () => test('path'))
  .task('proc',    () => test('process'))
  .task('prom',    () => test('promise'))
  .task('stamp',   () => test('stamp'))
  .task('str',     () => test('string'))
  .task('txt',     () => test('text'))
  .task('util',    () => test('util'))
  .task('cov',     cover)
