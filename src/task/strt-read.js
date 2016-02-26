function readr () {
  return (input) => {
    return function read (log) {
      const pify = require('../promise/pify');
      const readFile = pify(require('../file/graceful-fs').readFile)

      return Promise.all(
        input.map(file => {
          return readFile(file, 'utf-8').then(data => {
            log(file)
            return {
              path: file,
              data: data,
              map: null
            }
          })
        })
      )
    };
  }
}

module.exports = readr
