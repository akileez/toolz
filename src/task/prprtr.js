'use strict'
const path =  require('path');
const decamelize =  require('../string/unCamelCase');
const clr =  require('../util/colorz');
const StackUtils =  require('../error/stack-utils');

function prettyReporter () {
  let options = arguments.length <= 0 || arguments[0] === undefined
    ? { mute: [] }
    : arguments[0]

  let lastName = null;

  return function(rawName, type, message) {
    const name = '→ ' + decamelize(rawName, ' ');

    // mute raw and formatted names
    if (options.mute.indexOf(rawName) !== -1 || options.mute.indexOf(name) !== -1) {
      return;
    }

    // add newline between messages from different tasks
    if (lastName !== null && lastName !== name) {
      console.log('');
    }

    lastName = name;

    if (type === 'start') {
      console.log(`${clr.yellow(name)}: start`);
      return;
    }

    if (type === 'resolve') {
      console.log(`${clr.green(name)}: done`);
      return;
    }

    if (type === 'reject') {
      // hard error
      if (message instanceof Error) {
        const stackUtils = new StackUtils({
          cwd: process.cwd(),
          internals: StackUtils.nodeInternals()
        });

        const stack = stackUtils.clean(message.stack);

        console.log(`${clr.red(name)}: ${message.message}`);
        console.error('\n' + clr.red(stack));
      // soft error(s)
      } else if (typeof message !== 'undefined') {
        [].concat(message).forEach(msg => {
          console.log(`${clr.red(name)}: ${msg}`);
        });
      }

      console.log(`${clr.red(name)}: error`);
      return;
    }

    if (type === 'info') {
      [].concat(message)
        .map(msg => {
          if (path.isAbsolute(msg)) return path.relative(process.cwd(), msg);
          return msg;
        })
        .forEach(msg => {
          console.log(`${clr.blue(name)}: ${msg}`);
        });
    }
  };
}

module.exports = prettyReporter
