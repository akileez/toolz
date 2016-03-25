function watchr (callback)  {
  return (input) => {
    return function watch (log) {
      const reqf = require('../src/path/req-from')
      const chokidar = reqf('/usr/local/lib/node_modules', 'chokidar')

      return new Promise((resolve, reject) => {
        function init () {
          chokidar
            .watch(input, {persistent: true})
            .on('change', callback)
            .on('error', reject)
            .on('ready', () => {
                log('press ctrl-c to exit')
            })
        }

        callback(input)
          .then(init)
          .catch(init)
      })
    }
  }
}

module.exports = watchr
