var runr = require('../task/runr')
var strt = require('../task/strt')
var pp = require('../task/prprtr')
var files = require('../task/strt-files')
var eslint = require('../task/strt-eslint')

function show () {
  return strt(pp())(
    files('../src/array/*.js'),
    eslint()
  )
}

runr.task('show', show).task('default', show)