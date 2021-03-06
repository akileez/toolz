'use strict';

var http = require('http');
var urlParse = require('url').parse;
var humanize = require('humanize-number');
var colorz = require('../util/colorz');
var monkeypatch = require('monkeypatch');
var EventEmitter = require('events').EventEmitter;

var colorCodes = {
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green'
};

function time(start) {
  var delta = new Date() - start;
  delta = delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's';
  return humanize(delta);
}

function defaultHandler(request, options, cb) {
  options = typeof options === 'string' ? urlParse(options) : options;

  var url = options.href || (options.protocol || 'http://') + options.host + options.path;
  var method = (options.method || 'GET').toUpperCase();
  var signature = method + ' ' + url;
  var start = new Date();
  var wasHandled = typeof cb === 'function';

  setImmediate(console.log, colorz.gray('      → ' + signature));

  return request(options, cb)
    .on('response', function (response) {
      // Workaround for res._dump in Node.JS http client
      // https://github.com/nodejs/node/blob/20285ad17755187ece16b8a5effeaa87f5407da2/lib/_http_client.js#L421-L427
      if (!wasHandled && EventEmitter.listenerCount(response.req, 'response') === 0) {
        response.resume();
      }

      var status = response.statusCode;
      var s = status / 100 | 0;
      console.log('  ' + colorz[colorCodes[s]](status) + ' ← ' + signature + ' ' + colorz.gray(time(start)));
    })
    .on('error', function (err) {
      console.log('  ' + colorz.red('xxx') + ' ← ' + signature + ' ' + colorz.red(err.message));
    });
}

module.exports = function debugHttp(fn) {
  fn = fn || defaultHandler;

  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function as request handler');
  }

  monkeypatch(http, 'request', fn);
};
