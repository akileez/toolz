module.exports = Object.assign(
  Object.create(null),
  {env: require('./src/lint/env')},
  {globals: require('./src/lint/env/globals')},
  {ecmaFeatures: require('./src/lint/env/ecmaFeatures')},
  {rules: Object.assign(
    Object.create(null),
    require('./src/lint/rules/best-practices'),
    require('./src/lint/rules/es2015'),
    require('./src/lint/rules/node'),
    require('./src/lint/rules/possible-errors'),
    require('./src/lint/rules/strict-mode'),
    require('./src/lint/rules/stylistic-issues'),
    require('./src/lint/rules/variables')
  )}
)