function baseCompareAscending (val, oth) {
  if (val !== oth) {
    var valIsNull = val === null
    var valIsUndef = val === undefined
    var valIsReflexive = val === val

    var othIsNull = oth === null
    var othIsUndef = oth === undefined
    var othIsReflexive = oth === oth

    if ((val > oth && !othIsNull)
      || !valIsReflexive
      || (valIsNull && !othIsUndef && othIsReflexive)
      || (valIsUndef && othIsReflexive)
    ) return 1

    if ((val < oth && !valIsNull)
      || !othIsReflexive
      || (othIsNull && !valIsUndef && valIsReflexive)
      || (othIsUndef && valIsReflexive)
    ) return -1
  }
  return 0
}

module.exports = baseCompareAscending
