//

'use strict'

/*
  Prepend http:// to humanized URLs like todomvc.com and localhost

    const prependHttp = require('prepend-http');

    prependHttp('todomvc.com');
    //=> 'http://todomvc.com'

    prependHttp('localhost');
    //=> 'http://localhost'

    prependHttp('http://todomvc.com');
    //=> 'http://todomvc.com'

*/

module.exports = function (url) {
  if (typeof url !== 'string') {
    throw new TypeError('Expected a string')
  }

  url = url.trim()

  if (/^\.*\//.test(url)) {
    return url
  }

  return url.replace(/^(?!(?:\w+:)?\/\/)/, 'http://')
}
