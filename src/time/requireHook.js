'use strict';

var Module = require('module').Module;
var _load = Module._load;
var _hookedAt;
var _listener;

/**
 * Module hooker function that will replace Module._load
 * and invoke the _listener with module and timing
 * information
 *
 * @function _hooker
 */

function _hooker(name, parent) {
  var timeIn = Date.now();
  var exports = _load.apply(Module, arguments);
  var timeOut = Date.now();

  // should be the last loaded children
  var mod = parent.children[parent.children.length - 1];

  // call the listener
  _listener({
    name: name,
    parent: parent,
    module: mod,
    filename: mod ? mod.filename : name,
    exports: exports,
    requiredOn: timeIn,
    startedIn: timeOut - timeIn
  });
  return exports;
}

/**
 * Hook Node's require() so the configured callback will
 * be invocked with additional module and time loading
 * information information
 *
 * @param {Function} [listener] - optional listener if
 * @method hook
 */

function _hook(listener) {
  if (typeof listener !== 'undefined') {
    if (typeof listener !== 'function') {
      throw new Error('_hook() expects a function but got: ' + (typeof listener));
    }

    // set the listener
    _listener = listener;
  }

  // set the hooker loader
  Module._load = _hooker;

  // mark hooked time
  _hookedAt = new Date();
}

/**
 * Unhook Node's require() to the original function
 *
 * @method unhook
 */

function _unhook() {
  // set the original loader
  Module._load = _load;
  // reset hooking time
  _hookedAt = undefined;
}

/**
 * Export a function that set the callback and
 * return hook/unhook control functionality
 *
 * @param {Function} `listener` require() listener
 * @param {Boolean} [autohook=true] optional flag telling if the hooking will be started automatically
 * @return hook/unhook control function
 */

module.exports = function(listener, autohook) {
  if (typeof listener !== 'function') {
    throw new Error('The hooking function should be set');
  }

  // set the listener
  _listener = listener;

  if (autohook !== false) {
    _hook();
  }

  return {
    hookedAt: _hookedAt,
    hook: _hook,
    unhook: _unhook
  };
};