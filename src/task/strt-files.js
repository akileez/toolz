'use strict'
const defaultOptions = {
  realpath: true,
  ignore: [ 'node_modules/**', 'bower_components/**' ]
}

function filez (glob, userOptions) {
  return () => {
    return function files (log) {
      const globby = require('../glob/globbieP');

      const options = Object.assign({}, defaultOptions, userOptions)

      // return globby(glob, options, (err, result) => {
      //   log(result);
      //   return result;
      // })

      return globby(glob, options).then(result => {
        log(result);
        return result;
      })
    }
  }
}

module.exports = filez
