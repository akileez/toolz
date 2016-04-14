// use this file to automate the running of tests.
var runr     = require('../task/runr')
var spawn    = require('../src/cli/spawn-commands')
var lint     = require('./lint')

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
  var args = runr.opts.file
    ? `spec/${dir}/${runr.opts.file}.js`
    : `spec/${dir}/*.js`

  spawn([{cmd: './painless', args: [args]}], () => {
    if (runr.opts.lint && runr.opts.file) {
      lint(dir, runr.opts)
    }

    else if (runr.opts.lint && !runr.opts.file) {
      spawn([{cmd: './painless', args: [`lint/${dir}.js`, '-a']}])
    }
  })
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
