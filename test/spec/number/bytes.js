var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/bytes')
var t = painless.assert

var bytes = require('../../../src/number/bytes')

test('metric', function () {
  var options = { units: 'metric', precision: 1 }
  t.eq(bytes(1000, options), '1 kB')
  t.eq(bytes(10000, options), '10 kB')
  t.eq(bytes(34565346, options), '34.6 MB')
  t.eq(bytes(56356534635465, options), '56.4 TB')
  t.eq(bytes(42436356534635465, options), '42.4 PB')
  t.eq(bytes(5342436356534635465, options), '5.3 EB')
  t.eq(bytes(234235342436356534635465, options), '234.2 ZB')
  t.eq(bytes(345234235342436356534635465, options), '345.2 YB')
  t.eq(bytes(3234545234235342436356534635465, options), '3234545.2 YB')
})

test('iec', function () {
  t.eq(bytes(1000), '1000 B')
  t.eq(bytes(10000), '9.77 KiB')
  t.eq(bytes(34565346), '32.96 MiB')
  t.eq(bytes(56356534635465), '51.26 TiB')
  t.eq(bytes(42436356534635465), '37.69 PiB')
  t.eq(bytes(5342436356534635465), '4.63 EiB')
  t.eq(bytes(234235342436356534635465), '198.41 ZiB')
  t.eq(bytes(345234235342436356534635465), '285.57 YiB')
  t.eq(bytes(3234545234235342436356534635465), '2675553.11 YiB')
  t.eq(bytes(9873234545234235342436356534635465), '8166948199.01 YiB')
})

test('precision - metric', function () {
  t.eq(bytes(10, { units: 'metric' }), '10 B')
  t.eq(bytes(15, { units: 'metric' }), '15 B')
  t.eq(bytes(1500, { units: 'metric' }), '1.5 kB')
  t.eq(bytes(15000, { units: 'metric'}), '15 kB')
  t.eq(bytes(1500000, { units: 'metric' }), '1.5 MB')
})

test('precision - iec', function () {
  t.eq(bytes(10), '10 B')
  t.eq(bytes(15), '15 B')
  t.eq(bytes(1500), '1.46 KiB')
  t.eq(bytes(15000), '14.65 KiB')
  t.eq(bytes(1500000), '1.43 MiB')
})

test('converts bytes to human readable strings', () => {
  var options = { units: 'metric', precision: 0 }
  t.is(bytes(0), '0 B')
  t.is(bytes(0.4), '0.4 B')
  t.is(bytes(0.7), '0.7 B')
  t.is(bytes(10), '10 B')
  t.is(bytes(10.1), '10.1 B')
  t.is(bytes(999), '999 B')
  t.is(bytes(1001, options), '1 kB')
  t.is(bytes(1001, options), '1 kB')
  t.is(bytes(1e16, options), '10 PB')
  t.is(bytes(1e30, options), '1000000 YB')
})

test('negative numbers', () => {
  t.is(bytes(-0.4), '-0.4 B')
  t.is(bytes(-10), '-10 B')
  t.eq(bytes(-1500), '-1.46 KiB')
})
