// adopted from: tiny-frontmatter <https://github.com/rjreed/tiny-frontmatter>
// Copyright (c) Rocky Reed (MIT)

// enhance this!!!

function matter (str) {
  var basePattern = /^---$([\s\S]*)^---\s/m
  var fmPattern   = /(.*?)\s*:\s*(?:(?:\[\s*(.*?)(?=\s*\]))|(.*)|(\/.*\/[gimuy]+))/g
  var arrPattern  =  /\s?,\s?/g

  var results = basePattern.exec(str) || [null, null, str]
  var temp
  var fm = {
    data: {},
    content: str.replace(results[0], '') //results[2].trim
  }

  while (temp = fmPattern.exec(results[1]), temp) {
    fm.data[temp[1]] = temp[2] ? temp[2].split(arrPattern) : temp[3]
  }

  return fm
}

module.exports = matter
