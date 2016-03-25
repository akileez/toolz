var jlog = require('../src/util/jcolorz')

jlog(Object.assign(
  Object.create(null),
  {parserOptions: require('./lint/env/parserOptions')},
  {env: require('./lint/env')},
  {globals: require('./lint/env/globals')},
  {rules: Object.assign(
    Object.create(null),
    require('./lint/rules/possible-errors'),
    require('./lint/rules/best-practices'),
    require('./lint/rules/strict-mode'),
    require('./lint/rules/variables'),
    require('./lint/rules/node'),
    require('./lint/rules/stylistic-issues'),
    require('./lint/rules/ecmascript6')
  )}
))
