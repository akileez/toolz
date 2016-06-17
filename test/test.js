// use this file to automate the running of tests.
var runr     = require('../task/runr')
var spawn    = require('../src/cli/spawn-commands')
var lint     = require('./lint')

var type = runr.opts.text ? 'text' : 'html'

function defs () {
  spawn([{cmd: './painless', args: ['spec/**/*.js']}])
}

function cover () {
  spawn([{cmd: 'nyc', args: [
    `--reporter=${type}`,
    './painless',
    'spec/**/*.js'
  ]}])
}

function test (dir) {
  var args = `spec/${dir}/${runr.opts.file || '*'}.js`

  // for just testing coverage for a single collection
  // instead of testing the entire library
  if (runr.opts.covr) {
    spawn([{cmd: 'nyc', args: [
      `--reporter=${type}`,
      './painless',
      args
    ]}])
  }

  else {
    spawn([{cmd: './painless', args: [args]}], () => {
      if (runr.opts.lint && runr.opts.file) {
        lint(dir, runr.opts)
      }

      else if (runr.opts.lint && !runr.opts.file) {
        spawn([{cmd: './painless', args: [`lint/${dir}.js`, '-a']}])
      }
    })
  }
}

function test2 () {
  var args = `spec/${runr.opts.dir}/${runr.opts.file || '*'}.js`

  if (runr.opts.covr) {
    spawn([{cmd: 'nyc', args: [
      `--reporter=${type}`,
      './painless',
      args
    ]}])
  }

  else {
    spawn([{cmd: './painless', args: [args]}], () => {
      if (runr.opts.lint && runr.opts.file) {
        lint(dir, runr.opts)
      }

      else if (runr.opts.lint && !runr.opts.file) {
        spawn([{cmd: './painless', args: [`lint/${runr.opts.dir}.js`, '-a']}])
      }
    })
  }
}

runr
  .task('default', defs)
  .task('runr',    () => test2())
  .task('arr',     () => test('array'))
  .task('async',   () => test('async'))
  .task('func',    () => test('function'))
  .task('gen',     () => test('generator'))
  .task('json',    () => test('json'))
  .task('lang',    () => test('lang'))
  .task('num',     () => test('number'))
  .task('obj',     () => test('object'))
  .task('path',    () => test('path'))
  .task('proc',    () => test('process'))
  .task('prom',    () => test('promise'))
  .task('stamp',   () => test('stamp'))
  .task('str',     () => test('string'))
  .task('txt',     () => test('text'))
  .task('tim',     () => test('time'))
  .task('util',    () => test('util'))
  .task('cov',     cover)
