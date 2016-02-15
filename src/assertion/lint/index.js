// tape-eslint <https://github.com/rstacruz/tape-eslint>
// tape-eslint © 2016+, Rico Sta. Cruz. Released under the MIT License.

var eslint = require('./eslint')

// Integrate eslint into your tape tests

/*
  Rationale
  This offers a finer alternative to adding the eslint command as a separate test step in your npm test.

    Runs in the same node process as tape, removing maybe 500ms of startup time.
    Painlessly integrate eslint into your travisci.org tests.
    You can get fast realtime linting feedback with tape-watch.

  (Your speed gains may be a bit different from my Pentium II, of course.)

  My goal is to re-purpose this to work with ttr.

*/

module.exports = function tapeEslint (options) {
  return function (t) {
    eslint(options, function (err, res) {
      if (err) return t.fail(err)
      var count = errorify(t, res)
      if (count === 0) t.pass('passed')
      t.end()
    })
  }
}

/*
 * Converts eslint errors into `t.fail()` errors
 */

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