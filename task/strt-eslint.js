function eslintr (options, formatter) {
  return (input) => {
    return function eslint (log) {
      const reqf = require('../src/path/req-from')
      const CLIEngine = reqf('/usr/local/lib/node_modules', 'eslint').CLIEngine

      return new Promise((resolve, reject) => {
        const cli = new CLIEngine(options)
        const files = input.filter((file) => !cli.isPathIgnored(file))
        const report = cli.executeOnFiles(files)
        const format = cli.getFormatter(formatter)

        if (report.errorCount > 0 || report.warningCount > 0) {
          console.log(format(report.results))
        }

        if (report.errorCount > 0) {
          return reject()
        }

        if (report.errorCount === 0 && report.warningCount === 0) {
          log('¯\\_(ツ)_/¯')
        }

        // just resolve if there were no "hard" errors
        resolve(input)
      })
    }
  }
}

module.exports = eslintr
