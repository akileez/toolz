var fs      = require('fs')
var path    = require('path')

// yamljs
var extract = require('./index').extract

// front-matter-extractor

function parse (input, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  fs.readFile(input, 'utf8', function (err, res) {
    if (err) return cb(err)
    var fm = extract(res)

    cb(null, opts.extend ? extend(fm, input) : fm)
  })
}

function parseSync (input, opts) {
  opts = opts || {}
  var str = fs.readFileSync(input, 'utf8')
  var fm = extract(str)

  return opts.extend ? extend(fm, input) : fm
}

function extend (obj, fp) {
  return {
    abs     : fs.realpathSync(fp),
    rel     : fp,
    file    : pstats(fp),
    stats   : fs.lstatSync(fp),
    data    : obj.data,
    content : obj.content
  }
}

function pstats (fp) {
  return {
    root : process.cwd().split(/[\\\/]/g).slice(-1)[0],
    dir  : path.dirname(fp),
    base : path.basename(fp),
    ext  : path.extname(fp),
    name : path.basename(fp, path.extname(fp))
  }
}

module.exports = parse
module.exports.sync = parseSync
