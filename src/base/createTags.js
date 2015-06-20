var extend = require('../object/extend')

function otag (type, attr) {
  var html = ['<' + type]
  attr = extend({id: '', class: ''}, attr)

  for (var prop in attr) {
    // A falsy value is used to remove the attribute.
    // EG: attr[false] to remove, attr['false'] to add
    if (attr[prop]) html.push(prop + '="' + attr[prop] + '"');
  }
  return html.join(' ') + '>'
}

// closing tag for html, xml and others
function ctag (type) {
  return '</' + type + '>'
}

exports.otag = otag
exports.ctag = ctag
