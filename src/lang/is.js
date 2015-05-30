function is (a, b) {
   // implementation borrowed from harmony:egal spec
   // 0 === -0, but they are not identical
  if (a === b) return a !== 0 || 1 / a === 1 / b
  // NaN !== NaN, but they are identical.
  // NaNs are the only non-reflexive value, i.e., if x !== x,
  // then x is a NaN.
  // isNaN is broken: it converts its argument to number, so
  // isNaN("foo") => true
  return a !== a && b !== b
}

module.exports = is
