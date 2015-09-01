// adeopted from: https://github.com/75lb/byte-size
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

function bytesConvert (bytes, precision) {
  precision = precision || 2
  var kilo = 1024
  var mega = kilo * 1024
  var giga = mega * 1024
  var tera = giga * 1024

  // start doing this instead of "switch statment"
  if ((bytes >= 0) && (bytes < kilo))
    return bytes + ' B'

  else if ((bytes >= kilo) && (bytes < mega))
    return (bytes / kilo).toFixed(precision) + ' KB'

  else if ((bytes >= mega) && (bytes < giga))
    return (bytes / mega).toFixed(precision) + ' MB'

  else if ((bytes >= giga) && (bytes < tera))
    return (bytes / giga).toFixed(precision) + ' GB'

  else if (bytes >= tera)
    return (bytes / tera).toFixed(precision) + ' TB'

  else
    return bytes + ' B'
}

module.exports = bytesConvert
