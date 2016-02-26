function cleanr () {
  return (input) => {
    return function clean (log) {
      const pify = require('../promise/pify');
      const rimraf = pify(require('../file/rimraf'));

      return Promise.all(
        input.map(file => {
          return rimraf(file, { glob: false }).then(() => {
            log(file);

            return file;
          });
        })
      );
    };
  }
}

module.exports = cleanr
