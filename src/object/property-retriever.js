// adopted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties

// Enumerable properties are those properties whose internal [[Enumerable]] flag is set to true, which is the default for properties created via simple assignment or via a property initializer (properties defined via Object.defineProperty and such default [[Enumerable]] to false). Enumerable properties show up in for...in loops unless the property's name is a Symbol. Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain. Properties of an object can also be retrieved in total.

// Obtaining properties by enumerability/ownership
// Detection can occur by SimplePropertyRetriever.theGetMethodYouWant(obj).indexOf(prop) > -1
// Iteration can occur by SimplePropertyRetriever.theGetMethodYouWant(obj).forEach(function (value, prop) {}); (or use filter(), map(), etc.)

var SimplePropertyRetriever = {
    getOwnEnumerables: getOwnEnumerables,
    getOwnNonenumerables: getOwnNonenumerables,
    getOwnEnumerablesAndNonenumerables: getOwnEnumerablesAndNonenumerables,
    getPrototypeEnumerables: getPrototypeEnumerables,
    getPrototypeNonenumerables: getPrototypeNonenumerables,
    getPrototypeEnumerablesAndNonenumerables: getPrototypeEnumerablesAndNonenumerables,
    getOwnAndPrototypeEnumerables: getOwnAndPrototypeEnumerables,
    getOwnAndPrototypeNonenumerables: getOwnAndPrototypeNonenumerables,
    getOwnAndPrototypeEnumerablesAndNonenumerables: getOwnAndPrototypeEnumerablesAndNonenumerables
}

function getOwnEnumerables (obj) {
  // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj)
  return getAllPropertyNames(obj, true, false, _enumerable)
}

function getOwnNonenumerables (obj) {
  return getAllPropertyNames(obj, true, false, _notEnumerable)
}

function getOwnEnumerablesAndNonenumerables (obj) {
  // Or just use: return Object.getOwnPropertyNames(obj)
  return getAllPropertyNames(obj, true, false, _enumerableAndNotEnumerable)
}

function getPrototypeEnumerables (obj) {
  return getAllPropertyNames(obj, false, true, _enumerable)
}

function getPrototypeNonenumerables (obj) {
  return getAllPropertyNames(obj, false, true, _notEnumerable)
}

function getPrototypeEnumerablesAndNonenumerables (obj) {
  return getAllPropertyNames(obj, false, true, _enumerableAndNotEnumerable)
}

function getOwnAndPrototypeEnumerables (obj) {
  // Or could use unfiltered for..in
  return getAllPropertyNames(obj, true, true, _enumerable)
}

function getOwnAndPrototypeNonenumerables (obj) {
  return getAllPropertyNames(obj, true, true, _notEnumerable)
}

function getOwnAndPrototypeEnumerablesAndNonenumerables (obj) {
  return getAllPropertyNames(obj, true, true, _enumerableAndNotEnumerable)
}

// Private static property checker callbacks
function _enumerable (obj, prop) {
  return obj.propertyIsEnumerable(prop)
}

function _notEnumerable (obj, prop) {
  return !obj.propertyIsEnumerable(prop)
}

function _enumerableAndNotEnumerable (obj, prop) {
  return true
}

// Inspired by http://stackoverflow.com/a/8024294/271577
function getAllPropertyNames (obj, iterateSelfBool, iteratePrototypeBool, includePropCb) {
  var props = []

  do {
    if (iterateSelfBool) {
      Object.getOwnPropertyNames(obj).forEach(function (prop) {
        if (props.indexOf(prop) === -1 && includePropCb(obj, prop)) {
          props.push(prop)
        }
      })
    }
    if (!iteratePrototypeBool) {
      break
    }
    iterateSelfBool = true
  } while (obj = Object.getPrototypeOf(obj))

  return props
}

module.exports = SimplePropertyRetriever
