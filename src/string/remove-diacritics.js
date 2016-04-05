var stringify = require('./stringify')

var from = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž'
var to   = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz'

from += from.toUpperCase()
to   += to.toUpperCase()

to = to.split('')

// for tokens requiring multi-token output
from += 'ß'
to.push('ss')

function removeDiacritics (str) {
  return stringify(str).replace(/.{1}/g, function (c) {
    var idx = from.indexOf(c)
    return idx === -1 ? c : to[idx]
  })
}

module.exports = removeDiacritics
