'use strict';
/*jshint asi: true */

var painless = require('../../assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test async/itera')
var tseed    = painless.createGroup('Test async/itera [seed]')


var itera = require('../../../src/async/itera')
var unofails
var dosfails
var tresfails
var unocalled
var doscalled
var baddoscalled
var trescalled
var unocallsTwice

function uno (cb) {
  unocalled = true;
  setTimeout(
      function () {
        if (unofails) cb(new Error('uno failed'));
        else cb(null, 'eins');
      }
    , 10);

  if (unocallsTwice)
    setTimeout(function () { cb(null, 'eins'); } , 20);
}

function dos (resuno, cb) {
  doscalled = true;
  setTimeout(
      function () {
        if (dosfails) cb(new Error('dos failed'));
        else cb(null, resuno, 'zwei');
      }
    , 10);
}

function baddos (resuno, cb) {
  baddoscalled = true;
  throw new Error('dos was bad');
}

function synerror (resuno, cb) {
  var a;
  // on purpose
  aa++;
}

function tres (resuno, resdos, cb) {
  trescalled = true;
  setTimeout(
      function () {
        if (tresfails) cb(new Error('tres failed'));
        else cb(null, resuno, resdos, 'drei');
      }
    , 10);
}

function setup () {
  unofails = dosfails = tresfails = false;
  unocalled = doscalled = baddoscalled = trescalled = false;
  unocallsTwice = false;
}

test('functions passed as arguments', function (cb) {

  setup();

  itera(uno, dos, tres, function (err, resuno, resdos, restres) {
    t.equal(err, null, 'no error');
    t.equal(resuno, 'eins', 'passes first param');
    t.equal(resdos, 'zwei', 'passes second param');
    t.equal(restres, 'drei', 'passes third param');
    cb()
  });
});

test('functions passed as an array', function (cb) {

  setup();

  itera([uno, dos, tres, function (err, resuno, resdos, restres) {
    t.equal(err, null, 'no error');
    t.equal(resuno, 'eins', 'passes first param');
    t.equal(resdos, 'zwei', 'passes second param');
    t.equal(restres, 'drei', 'passes third param');
    cb()
  }]);
});

test('functions passed as an object', function (cb) {

  setup();

  itera({a: uno, b: dos, c: tres, d: function (err, resuno, resdos, restres) {
    t.equal(err, null, 'no error');
    t.equal(resuno, 'eins', 'passes first param');
    t.equal(resdos, 'zwei', 'passes second param');
    t.equal(restres, 'drei', 'passes third param');
    cb()
  }});
});

test('handle errors: last in chain (tres) fail', function (cb) {

  setup()
  tresfails = true

  itera(uno, dos, tres, function (err, resuno, resdos, restres) {
    t.ok(/tres failed/.test(err.message), 'passes error')
    t.ok(unocalled, 'called uno')
    t.ok(doscalled, 'called dos')
    t.ok(trescalled, 'called tres')

    t.equal(resuno, undefined, 'no resuno')
    t.equal(resdos, undefined, 'no resdos')
    t.equal(restres, undefined, 'no restres')
    cb()
  })
})

test('handle errors: first in chain (uno) fails', function (cb) {

  setup()
  unofails = true

  itera(uno, dos, tres, function (err, resuno, resdos, restres) {
    t.ok(/uno failed/.test(err.message), 'passes error');
    t.ok(unocalled, 'called uno');
    t.notOk(doscalled, 'not called dos')
    t.notOk(trescalled, 'not called tres')

    t.equal(resuno, undefined, 'no resuno')
    t.equal(resdos, undefined, 'no resdos')
    t.equal(restres, undefined, 'no restres')
    cb()
  })
})

test('handle errors: first in chain (uno) fails and calls again afterwards', function (cb) {

  setup();
  unofails = true;
  unocallsTwice = true;

  var count = 0
    , keptErr
    , keptResuno
    , keptResdos
    , keptRestres
    ;

  itera(uno, dos, tres, function (err, resuno, resdos, restres) {
    count++;
    if (err) keptErr = err;

    keptResuno = resuno;
    keptResdos = resdos;
    keptRestres = restres;
  })

  // Last callback would have happened after 20 + 10 + 10 = 40ms
  setTimeout(
    function () {

      t.equal(count, 1, 'itera called back only once');
      t.ok(/uno failed/.test(keptErr.message), 'passes error');
      t.ok(unocalled, 'called uno');
      t.notOk(doscalled, 'not called dos');
      t.notOk(trescalled, 'not called tres');

      t.equal(keptResuno, undefined, 'no resuno');
      t.equal(keptResdos, undefined, 'no resdos');
      t.equal(keptRestres, undefined, 'no restres');

      cb()
    }
  , 50);
});

test('0 arguments', function () {
  setup()
  t.throws(function () {itera()})
})

test('1 argument', function () {
  setup();
  t.throws(function () { itera() })
});

test('3rd argument not a function', function () {
  setup()
  function f () {}

  t.throws(function () { itera(f, f, "duh"); })
})

test('second callback throws', function (done) {

  setup()

  itera(uno, baddos, tres, function (err, resuno, resdos, restres) {

    t.ok(/dos was bad/.test(err.message), 'passes error')
    t.ok(unocalled, 'called uno')
    t.ok(baddoscalled, 'called baddos')
    t.notOk(trescalled, 'not called tres')

    t.equal(resuno, undefined, 'no resuno')
    t.equal(resdos, undefined, 'no resdos')
    t.equal(restres, undefined, 'no restres')

    done()
  })
})

test('second callback has syntax error', function (done) {

  setup()

  itera(uno, synerror, tres, function (err) {
    if (!process.browser)
      // no way to cover all possible error messages for each browser
      t.ok(/aa is not defined/.test(err.message), 'passes syntax error')
    else
      t.ok(err, 'passes syntax error')

    t.ok(unocalled, 'called uno')
    t.notOk(trescalled, 'not called tres')

    done()
  })
})

tseed('seeding one value ', function (done) {
  itera(itera.seed(1), function (err, val) {
    t.notOk(err, 'no error')
    t.equal(val, 1, 'passes seed as value to next function in chain')
    done()
  })
})

tseed('seeding three values', function (done) {
  itera(itera.seed(1, 2, 3), function (err, uno, dos, tres) {
    t.notOk(err, 'no error')
    t.equal(uno, 1, 'passes first')
    t.equal(dos, 2, 'passes second')
    t.equal(tres, 3, 'passes third')
    done()
  })
})

tseed('async reduce long running computations', function (next) {
  var computations = [ '1 + 2', '2 + 3', '3 + 4'  ]

  var tasks = computations.map(
    function (op) {
      return function compute (acc, cb) {
        // long running computation ;)

        setTimeout(function () {
          var args = op.split('+');
          acc[op] = parseInt(args[0], 10) + parseInt(args[1], 10);
          cb(null, acc)
        }, 10);

      };
    });

  itera(
    [ itera.seed({}) ]
      .concat(tasks)
      .concat(function done (err, res) {
        t.notOk(err, 'no error')
        t.same(res, { '1 + 2': 3, '2 + 3': 5, '3 + 4': 7 })
        next()
      })
  )
})
