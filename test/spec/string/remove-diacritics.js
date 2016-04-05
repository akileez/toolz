var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/remove-diacritics')
var t = painless.assert

var removeDiacritics = require('../../../src/string/remove-diacritics')

var from  = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž'
var to    = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz'

test('#removeDiacritics', function() {

  t.eq(removeDiacritics(from), to)
  t.eq(removeDiacritics(from.toUpperCase()), to.toUpperCase())


  t.eq(removeDiacritics('ä'), 'a')
  t.eq(removeDiacritics('Ä Ø'), 'A O')
  t.eq(removeDiacritics('1 foo ääkkönen'), '1 foo aakkonen')
  t.eq(removeDiacritics('Äöö ÖÖ'), 'Aoo OO')
  t.eq(removeDiacritics(' ä '), ' a ')
  t.eq(removeDiacritics('- " , £ $ ä'), '- " , £ $ a')

  t.eq(removeDiacritics('ß'), 'ss')
  t.eq(removeDiacritics('Schuß'), 'Schuss')
})
