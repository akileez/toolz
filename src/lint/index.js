module.exports = Object.assign(
  Object.create(null),
  {parserOptions: require('./env/parserOptions')},
  {env: require('./env')},
  {globals: require('./env/globals')},
  {rules: Object.assign(
    Object.create(null),
    require('./rules/possible-errors'),
    require('./rules/best-practices'),
    require('./rules/strict-mode'),
    require('./rules/variables')
    require('./rules/node'),
    require('./rules/stylistic-issues'),
    require('./rules/ecmascript6')
  )}
)
