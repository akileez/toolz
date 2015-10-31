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

function visit (collection, method, target) {
  if (Array.isArray(target)) arrVisit(collection, method, target)
  else objVisit(collection, method, target)

  return collection
}

function arrVisit (collection, method, target) {
  target.forEach(function (obj) {
    objVisit(collection, method, obj)
  })
}

function objVisit (collection, method, target) {
  for (var key in target) {
    if (target.hasOwnProperty(key)) collection[method](key, target[key])
  }

  return collection
}

module.exports = visit
