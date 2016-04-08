'use strict'

var isNaN = require('../number/isNaN')

function isFullwidthCodePoint (str) {
  if (isNaN(str)) return false

  // https://github.com/nodejs/io.js/blob/cff7300a578be1b10001f2d967aaedc88aee6402/lib/readline.js#L1369

  // code points are derived from:
  // http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt

  if (str >= 0x1100
    && (str <= 0x115f   // Hangul Jamo
    || 0x2329 === str  // LEFT-POINTING ANGLE BRACKET
    || 0x232a === str  // RIGHT-POINTING ANGLE BRACKET
    // CJK Radicals Supplement .. Enclosed CJK Letters and Months
    || (0x2e80 <= str && str <= 0x3247 && str !== 0x303f)
    // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
    || 0x3250 <= str && str <= 0x4dbf
    // CJK Unified Ideographs .. Yi Radicals
    || 0x4e00 <= str && str <= 0xa4c6
    // Hangul Jamo Extended-A
    || 0xa960 <= str && str <= 0xa97c
    // Hangul Syllables
    || 0xac00 <= str && str <= 0xd7a3
    // CJK Compatibility Ideographs
    || 0xf900 <= str && str <= 0xfaff
    // Vertical Forms
    || 0xfe10 <= str && str <= 0xfe19
    // CJK Compatibility Forms .. Small Form Variants
    || 0xfe30 <= str && str <= 0xfe6b
    // Halfwidth and Fullwidth Forms
    || 0xff01 <= str && str <= 0xff60
    || 0xffe0 <= str && str <= 0xffe6
    // Kana Supplement
    || 0x1b000 <= str && str <= 0x1b001
    // Enclosed Ideographic Supplement
    || 0x1f200 <= str && str <= 0x1f251
    // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
    || 0x20000 <= str && str <= 0x3fffd)) {
    return true
  }

  return false
}

module.exports = isFullwidthCodePoint
