var deglob = require('../../src/glob/deglob')
var reqf   = require('../../src/path/reqf')
var eslint = reqf('/usr/local/lib/node_modules', 'eslint')
var assign = require('../../src/object/object-assign')

// https://github.com/sindresorhus/xo/blob/7644b9d9faf517b5b8f049b2083f13e7a803596c/index.js#L12-L21
var DEFAULT_IGNORE = [
  'node_modules/**',
  'bower_components/**',
  'coverage/**',
  '{tmp,temp}/**',
  '**/*.min.js',
  '**/bundle.js',
  'fixture{-*,}.{js,jsx}',
  '{test/,}fixture{s,}/**',
  'vendor/**',
  'dist/**'
]

var DEGLOB_OPTIONS = {
  useGitIgnore: true,
  usePackageJson: true,
  configKey: 'eslint',
  ignore: DEFAULT_IGNORE
}

var DEFAULT_PATTERNS = [
  '**/*.js',
  '**/*.jsx'
]

module.exports = tapeEslint

function tapeEslint (options) {
  return function (t) {
    runEslint(options, function (err, res) {
      if (err) return t.fail(err)
      var count = errorify(t, res)
      if (count === 0) t.pass('passed')
      t.end()
    })
  }
}

// Converts eslint errors into `t.fail()` errors

function errorify (t, res) {
  var messages = 0
  res.results.forEach(function (result) {
    if (result.errorCount || result.warningCount) {
      result.messages.forEach(function (msg) {
        messages += 1
        t.fail('' +
          result.filePath.replace(process.cwd(), '') +
          ':' + msg.line + ':' + msg.column + ': ' +
          msg.message + ' (' + msg.ruleId + ')')
      })
    }
  })
  return messages
}

/*
  A simpler interface to eslint.

      runEslint({ files: ['lib/*.js'] }, (err, res) => {
        // ...
      })

  Available options:
  - `files` *(Array<String>)* - file globs
  - `ignore` *(Array<String>)* - ignore globs
  - `eslint` *(Object)* — eslint config to use
*/

function runEslint (options, cb) {
  try {
    if (!options) options = {}
    var deglobOptions = DEGLOB_OPTIONS
    if (options.ignore) {
      deglobOptions = assign({}, deglobOptions, {
        ignore: deglobOptions.ignore.concat(options.ignore)
      })
    }

    deglob(options.files || DEFAULT_PATTERNS, deglobOptions, function (err, files) {
      if (err) return cb(err)
      var cli = new eslint.CLIEngine(options.eslint)
      var res = cli.executeOnFiles(files)
      cb(null, res)
    })
  } catch (err) {
    cb(err)
  }
}


