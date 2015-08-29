function openTag (type, closing, attr) {
  var html = ['<' + type]

  for (var prop in attr) {
    // A falsy value is used to remove the attribute.
    // EG: attr[false] to remove, attr['false'] to add
    if (attr[prop]) html.push(prop + '="' + attr[prop] + '"')
  }
  return html.join(' ') + (!closing ? ' /' : '') + '>'
}

function closeTag (type) {
  return '</' + type + '>'
}

function createElement (type, closing, attr, contents) {
  return openTag(type, closing, attr)
    + (closing ? (contents || '')
    + closeTag(type) : '')
}

module.exports = createElement
