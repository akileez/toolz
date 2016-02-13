var jlog = require('./src/util/jcolorz')

jlog(Object.assign(
  Object.create(null),
  {parserOptions: require('./src/lint/env/parserOptions')},
  {env: require('./src/lint/env')},
  {globals: require('./src/lint/env/globals')},
  {rules: Object.assign(
    Object.create(null),
    require('./src/lint/rules/possible-errors'),
    require('./src/lint/rules/best-practices'),
    require('./src/lint/rules/strict-mode'),
    require('./src/lint/rules/variables'),
    require('./src/lint/rules/node'),
    require('./src/lint/rules/stylistic-issues'),
    require('./src/lint/rules/ecmascript6')
  )}
))
