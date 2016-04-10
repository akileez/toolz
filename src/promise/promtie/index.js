/* eslint global-require: 0 */

'use strict'

// Collections
exports.each         = require('./each')
exports.map          = require('./map')
exports.filter       = require('./filter')
exports.reduce       = require('./reduce')
exports.values       = require('./values')
exports.settle       = require('./settle')

// Others
exports.attempt      = require('./attempt')
exports.spread       = require('./spread')
exports.retry        = require('./retry')
exports.delay        = require('./delay')
exports.timeout      = require('./timeout')
exports.catchIf      = require('./catchIf')
exports.whilst       = require('./whilst')
exports.times        = require('./times')
exports.through      = require('./through')
exports.nodeify      = require('./nodeify')

// Promisification
exports.promisify    = require('./promisify')
exports.promisifyAll = require('./promisifyAll')
