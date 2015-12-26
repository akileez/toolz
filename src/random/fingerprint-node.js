// adopted from: node-fingerprint <https://github.com/therealklanni/node-fingerprint>
// Copyright MIT © Kevin Lanni

// use: var fingerprint = require('toolz/src/env/fingerprint-node')(process.pid)
var os = require('os')

var padding = 2
var pad = function pad(str, size) {
  return (new Array(size + 1).join('0') + str).slice(-size);
}

var hostname = os.hostname().split('').reduce(function (prev, char) {
  return +prev + char.charCodeAt(0)
}, +os.hostname().length + 36).toString(36)

var hostId = pad(hostname, padding)

module.exports = function (pid) {
  return pad(pid.toString(36), padding) + hostId;
};
