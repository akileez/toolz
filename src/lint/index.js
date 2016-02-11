module.exports = Object.assign(
  Object.create(null),
  {env: require('./env')},
  {globals: require('./env/globals')},
  {ecmaFeatures: require('./env/ecmaFeatures')},
  {rules: Object.assign(
    Object.create(null),
    require('./rules/best-practices'),
    require('./rules/es2015'),
    require('./rules/node'),
    require('./rules/possible-errors'),
    require('./rules/strict-mode'),
    require('./rules/stylistic-issues'),
    require('./rules/variables')
  )}
)
