var runr = require('../src/task/runr')
var strt = require('../src/task/strt')
var pp = require('../src/task/prprtr')
var files = require('../src/task/strt-files')
var eslint = require('../src/task/strt-eslint')

function show () {
  return strt(pp())(
    files('../src/array/*.js'),
    eslint()
  )
}

runr.task('show', show).task('default', show)