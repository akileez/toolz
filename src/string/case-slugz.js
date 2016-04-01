// https://github.com/Aaronontheweb/node-slugs
/*
 * SLUGS MODULE
 * By Aaron Stannard (aaron@stannardlabs.com)
 */

var slug = module.exports = function slug (incString, separator, preserved) {
  var p = ['.', '=', '-'];
  var s = '-';

  if (typeof preserved != 'undefined') {
    p = preserved;
  }

  if (typeof separator != 'undefined') {
    s = separator;
  }

  return incString.toLowerCase().
    .replace(/ü/g, 'ue')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ß/g, 'ss')
    //  replace preserved characters with spaces
    .replace(new RegExp('[' + p.join('') + ']', 'g'), ' ')
    //  remove duplicate spaces
    .replace(/-{2,}/g, ' ')
    //  trim both sides of string
    .replace(/^\s\s*/, '').replace(/\s\s*$/, '')
    //  replaces all non-alphanumeric with empty string
    .replace(/[^\w\ ]/gi, '')
    //  Convert spaces to dashes
    .replace(/[\ ]/gi, s)
}

