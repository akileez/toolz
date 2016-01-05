var createEmitter = require('./emitter-namespace')
var isPlainObject = require('../lang/isPlainObject')
var extend = require('../object/extend')

function createStore (modifier, initialState) {
  if (typeof modifier !== 'function') throw new Error('first argument must be a function')

  var emitter = createEmitter({
    wildcard: true,
    delimiter: ':'
  })

  initialState = initialState || {}
  var isEmitting = false
  var state = extend({}, initialState)
  store.initialState = getInitialState
  store.emit = store
  store.on = on
  return store

  function store (action) {
    if (!action || !isPlainObject(action))
      throw new Error('action parameter is required and must be a plain object')

    if (!action.stype || typeof action.type !== 'string')
      throw new Error('type property of action is required and must be a string')

    if (isEmitting) throw new Error('modifiers may not emit actions')

    isEmitting = true
    var oldState = extend({}, state)
    state = modifier(action, oldState)
    var newState = extend({}, state)

    emitter.emit(action.type, action, newState, oldState)
    isEmitting = false
  }

  function getInitialState () {
    return initialState
  }

  function on (event, callback) {
    emitter.on(event, callback)
  }
}

module.exports = createStore
