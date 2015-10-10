var where = require('./where')

function findWhere (records, query) {
  return where(records, query)[0]
}

module.exports = findWhere
