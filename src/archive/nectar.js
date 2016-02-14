// https://github.com/jmversteeg/nectar

'use strict';

const isStream = require('../lang/isStream');
const Promise = require('../async/pinkie-promise');
const globby = require('../glob/globby');
const tar = require('./tar-fs');
const fs = require('fs');
const isString = require('../lang/isString')
const isArray = require('../lang/isArray')
const dirGlob = require('../glob/dir-glob');

/**
 * Creates a tar archive containing all files matched by the given input glob(s). The directory structure is preserved.
 * @param {string|string[]} globs
 * @param {string} [output]
 * @returns {Promise.<stream.Readable>|Promise.<string[]>} A readable stream of the tar archive if no output argument is provided,
 *      or a promise for writing the tar archive to the given output destination.
 */
const nectar = function (globs, output) {
  let writeStream = null;
  if (isString(output))
    writeStream = fs.createWriteStream(output);
  else if (isStream.writable(output))
    writeStream = output;
  return dirGlob(isArray(globs) ? globs : [globs])
    .then(globs => globby(globs, {
      nodir: true
    }))
    .then(entries => {
      const matches = entries.slice();
      let pack = tar.pack(process.cwd(), {
        entries: entries
      });
      if (writeStream !== null) {
        pack.pipe(writeStream);
        return new Promise(resolve => pack.on('end', () => resolve(matches)));
      }
      else
        return pack;
    });
};

module.exports = nectar;

