// adopted from:
//   object-visit <https://github.com/jonschlinkert/object-visit>
//   map-visit <https://github.com/jonschlinkert/map-visit>
//   collection-visit <https://github.com/jonschlinkert/collection-visit>
// Copyright (c) 2015, Jon Schlinkert -- MIT

/*
    var visit = require('visit');

    var ctx = {
      data: {},
      set: function (key, value) {
        if (typeof key === 'object') {
          visit(ctx, 'set', key);
        } else {
          ctx.data[key] = value;
        }
      }
    };

    ctx.set('a', 'a');
    ctx.set('b', 'b');
    ctx.set('c', 'c');
    ctx.set({d: {e: 'f'}});

    console.log(ctx.data);
    //=> {a: 'a', b: 'b', c: 'c', d: { e: 'f' }};
*/

function objVisit (thisArg, method, target) {
  for (var key in target) {
    if (target.hasOwnProperty(key)) thisArg[method](key, target[key])
  }

  return thisArg
}

function arrVisit (thisArg, method, array) {

  array.forEach(function (obj) {
    objVisit(thisArg, method, obj)
  })
}

function visit (collection, method, val) {
  if (Array.isArray(val)) arrVisit(collection, method, val)
  else objVisit(collection, method, val)

  return collection
}

module.exports = visit
