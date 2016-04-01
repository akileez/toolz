var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/_mixer')
var t = painless.assert

var mixer = require('../../../src/object/_mixer')
var mixin = mixer.mixin
var merge = mixer.merge
var mergeUnique = mixer.mergeUnique
var noop = () => {}

test('mixin two objects', () => {
  const o1 = { number: 1 };
  const o2 = { obj: { deeper: 2 } };
  const result = mixin({}, o1, o2);

  t.eq(result.number, 1, 'should mix base types');
  t.eq(result.obj.deeper, 2, 'should mix complex objects');
});

test('mixin two objects with function props', () => {
  const o1 = { func1: noop };
  const o2 = { func2: noop };
  const result = mixin({}, o1, o2);

  t.ok(result.func1, 'should mix functions');
  t.ok(result.func1, 'should mix multiple objects functions');
});

test('merging two objects', () => {
  const o1 = {deep1: 1};
  const o2 = {deep2: {deeper: 2}};
  const result = merge({}, o1, o2);

  t.eq(result.deep1, 1, 'should merge properties one level deep');
  t.eq(result.deep2.deeper, 2, 'should merge properties two or more levels deep');
});

test('merging two objects with function props', () => {
  const o1 = {deep1: noop};
  const o2 = {deep2: {deeper: noop}};
  const result = merge({}, o1, o2);

  t.ok(result.deep1, 'should not merge functions one level deep');
  t.eq(typeof result.deep2, 'object', 'should merge objects one level deep');
  t.ok(result.deep2.deeper, 'should not merge functions two or more levels deep');
});

test('add first level function', () => {
  const funcWithProp = () => {
  };
  funcWithProp.prop = 42;
  const result = merge({}, {last: funcWithProp});

  t.eq(result.last.prop, 42, 'should merge non existing functions one level deep');
});

test('add second level function', () => {
  const result = merge({}, {first: {last: noop}});

  t.eq(result.first.last, noop, 'should merge non existing functions two levels deep');
});

test('merge', () => {
  const o1 = {
    foo: {bar: 'bar'},
    propsOverride: false,
    func1() {}
  };
  const o2 = {
    bar: 'bar',
    propsOverride: true,
    func2() {}
  };

  const result = merge({}, o1, o2);

  t.eq(result.foo.bar, 'bar', 'Should set default props.');
  t.eq(result.bar, 'bar', 'Should let you add by chaining .props().');
  t.eq(result.propsOverride, true, 'Should let you override by chaining .props().');
  t.ok(result.func1, 'Should mix functions.');
  t.ok(result.func2, 'Should mix functions.');
});

test('uniquely merging two objects', () => {
  const original = 'original';
  const o1 = { deep1: 1 };
  const o2 = { deep2: { deeper: 2 } };
  const result = mergeUnique({ deep1: original, deep2: { deeper: original } }, o1, o2, { last: 1 });

  t.eq(result.deep1, original, 'should not merge existing properties one level deep');
  t.eq(result.deep2.deeper, original, 'should not merge existing properties two or more levels deep');
  t.eq(result.last, 1, 'also should merge non existing properties one level deep');
});

test('uniquely merging two objects with function props', () => {
  const original = () => {};
  const o1 = { deep1: noop };
  const o2 = { deep2: { deeper: noop } };
  const result = mergeUnique({ deep1: original, deep2: { deeper: original } }, o1, o2, { last: 1 });

  t.eq(result.deep1, original, 'should not merge existing functions one level deep');
  t.eq(result.deep2.deeper, original, 'should not merge existing functions two or more levels deep');
  t.eq(result.last, 1, 'also should merge non existing properties one level deep');
});

// test('all options work together', () => {
//   const mix = mixer({
//     filter(sourceValue, targetValue, key) { return key[0] !== '_'; },
//     transform(resultingValue, targetValue, key) { return key === 'name' ? 'new name' : resultingValue; },
//     chain: true,
//     deep: true,
//     noOverwrite: true
//   });

//   // Using tape.Test as a good example of a complex object.
//   const obj = new test.Test('old name');
//   obj.deep = { deeper: true };
//   const result = mix({ readable: 'no overwrite please' }, obj);

//   t.eq(obj.readable, true, 'pre check source object');
//   t.ne(obj.name, 'new name', 'pre check source object');

//   t.ok(result.assert, 'should grab prototype properties');
//   t.ok(result.emit, 'should grab prototype of prototype properties');
//   t.notOk(result._ok, 'should filter out private properties');
//   t.notOk(result._skip, 'should filter out private properties');
//   t.notOk(result._end, 'should filter out private properties');
//   t.notOk(result._assert, 'should filter out private properties');
//   t.ok(result.deep.deeper, 'should grab deep properties');
//   t.eq(result.name, 'new name', 'should transform values');
//   t.eq(result.readable, 'no overwrite please', 'should not overwrite properties');
// });