var core = require('./core');
exports = module.exports = require('./async');
exports.core = core;
exports.isCore = function (x) { return core[x] };
exports.sync = require('./sync');