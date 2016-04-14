'use strict'

const painless = require('../../assertion/painless')

const test = painless.createGroup('Test task/strt')
const t    = painless.assert
const spy  = painless.spy

const strt  = require('../../../task/strt')
const dlogr = require('../../../src/debug/dlogr')
const debug = dlogr.dbug

const noopReporter = () => {}

test('export', () => {
  t.equal(
    typeof strt,
    'function',
    'must be a function'
    );
});

test('single task + resolve', () => {
  const testSpy = spy();

  strt(noopReporter)(
    function() {
      return function testTask() {
        return new Promise(function(resolve) {
          testSpy();
          resolve();
        });
      };
    }
    ).then(function() {
      t.true(
        testSpy.calledOnce,
        'task must been called once'
        );
    });
  });

test('single task + reject', () => {
  const testSpy = spy();

  strt(noopReporter)(
    function() {
      return function testTask() {
        return new Promise(function(resolve, reject) {
          testSpy();
          reject();
        });
      };
    }
    ).catch(function() {
      t.true(
        testSpy.calledOnce,
        'task must been called once'
        );
    });
  });

test('sequence of tasks + resolve', () => {
  const testSpy1 = spy();
  const testSpy2 = spy();

  strt(noopReporter)(
    function() {
      return function testTask1() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            testSpy1();
            resolve();
          }, 0);
        });
      };
    },
    function() {
      return function testTask2() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            testSpy2();
            resolve();
          }, 0);
        });
      };
    }
    ).then(function() {
      t.true(
        testSpy1.calledOnce,
        'task 1 must been called once'
        );

      t.true(
        testSpy2.calledOnce,
        'task 2 must been called once'
        );

      t.true(
        testSpy1.calledBefore(testSpy2),
        'tasks must been called in sequence'
        );
    });
  });

test('sequence of tasks + reject', () => {
  const testSpy1 = spy();
  const testSpy2 = spy();

  strt(noopReporter)(
    function() {
      return function testTask1() {
        return new Promise(function(resolve, reject) {
          testSpy1();
          reject();
        });
      };
    },
    function() {
      return function testTask2() {
        return new Promise(function(resolve, reject) {
          testSpy2();
          reject();
        });
      };
    }
    ).catch(function() {
      t.true(
        testSpy1.calledOnce,
        'task must been called once'
        );

      t.equal(
        testSpy2.callCount,
        0,
        'task 2 must not been called'
        );
    });
  });

test('sequence of tasks + hard error', () => {
  const testSpy1 = spy();
  const testSpy2 = spy();

  strt(noopReporter)(
    function() {
      return function testTask1() {
        return new Promise(function() {
          testSpy1();
          throw new Error('oops');
        });
      };
    },
    function() {
      return function testTask2() {
        return new Promise(function(resolve, reject) {
          testSpy2();
          reject();
        });
      };
    }
    ).catch(function() {
      t.true(
        testSpy1.calledOnce,
        'task 1 must been called once'
        );

      t.equal(
        testSpy2.callCount,
        0,
        'task 2 must not been called'
        );
    });
  });

test('nested', () => {
  const testSpy1 = spy();
  const testSpy2 = spy();

  function sub() {
    return strt(noopReporter)(
      function() {
        return function testTask1() {
          return new Promise(function(resolve) {
            testSpy1();
            resolve();
          });
        };
      }
      );
  }

  strt(noopReporter)(
    sub,
    function() {
      return function testTask2() {
        return new Promise(function(resolve) {
          testSpy2();
          resolve();
        });
      };
    }
    ).then(function() {
      t.true(
        testSpy1.calledOnce,
        'task 1 must been called once'
        );

      t.true(
        testSpy2.calledOnce,
        'task 2 must been called once'
        );

      t.true(
        testSpy1.calledBefore(testSpy2),
        'tasks must been called in sequence'
        );
    });
  });

test('reporter + single task + resolve', () => {
  const spyReporter = spy();

  strt(spyReporter)(
    function() {
      return function testTask() {
        return new Promise(function(resolve) {
          resolve('resolve');
        });
      };
    }
    ).then(function() {
      t.equal(
        spyReporter.callCount,
        2,
        'reporter must been called 2 times'
        );

      t.true(
        spyReporter.getCall(0).calledWith('testTask', 'strt'),
        '1st: strt'
        );

      t.true(
        spyReporter.getCall(1).calledWith('testTask', 'resolve'),
        '2nd: resolve'
        );
    });
  });

test('reporter + single task + reject', () => {
  const spyReporter = spy();

  strt(spyReporter)(
    function() {
      return function testTask() {
        return new Promise(function(resolve, reject) {
          reject('error');
        });
      };
    }
    ).catch(function() {
      t.equal(
        spyReporter.callCount,
        2,
        'reporter must been called 2 times'
        );

      t.true(
        spyReporter.getCall(0).calledWith('testTask', 'strt'),
        '1st: strt'
        );

      t.true(
        spyReporter.getCall(1).calledWith('testTask', 'reject', 'error'),
        '2nd: reject'
        );
    });
  });

test('reporter + single task + hard error inside the Promise', () => {
  const spyReporter = spy();

  strt(spyReporter)(
    function() {
      return function testTask() {
        return new Promise(function(resolve, reject) {
          throw new Error('oops');
        });
      };
    }
    ).catch(function() {
      t.equal(
        spyReporter.callCount,
        2,
        'reporter must been called 2 times'
        );

      t.true(
        spyReporter.getCall(0).calledWith('testTask', 'strt'),
        '1st: strt'
        );

      t.true(
        spyReporter.getCall(1).calledWith('testTask', 'reject', new Error()),
        '2nd: reject'
        );
    });
  });

test('reporter + single task + hard error outside the Promise', () => {
  const spyReporter = spy();

  strt(spyReporter)(
    function() {
      return function testTask() {
        throw new Error('oops');

        return new Promise(function(resolve, reject) {
          resolve();
        });
      };
    }
    ).catch(function() {
      t.equal(
        spyReporter.callCount,
        2,
        'reporter must been called 2 times'
        );

      t.true(
        spyReporter.getCall(0).calledWith('testTask', 'strt'),
        '1st: strt'
        );

      t.true(
        spyReporter.getCall(1).calledWith('testTask', 'reject', new Error()),
        '2nd: reject'
        );
    });
  });

test('reporter + single task + log', () => {
  const spyReporter = spy();

  strt(spyReporter)(
    function() {
      return function testTask(log) {
        return new Promise(function(resolve, reject) {
          log('test');

          resolve();
        });
      };
    }
    ).then(function() {
      // debug('output from spyReporter.getCall(0)', spyReporter.getCall(0))
      t.equal(
        spyReporter.callCount,
        3,
        'reporter must been called 3 times'
        );
      t.true(
        spyReporter.getCall(0).calledWith('testTask', 'strt'),
        '1st: strt'
        );

      t.true(
        spyReporter.getCall(1).calledWith('testTask', 'info', 'test'),
        '2nd: info'
        );

      t.true(
        spyReporter.getCall(2).calledWith('testTask', 'resolve'),
        '3rd: resolve'
        );
    });
  });

test('default reporter', () => {
  const origConsoleLog = console.log;
  const spyReporter = spy();

  console.log = spyReporter;

  strt()(
    function() {
      return function testTask(log) {
        return new Promise(function(resolve, reject) {
          resolve();
        });
      };
    }
    ).then(function() {
      console.log = origConsoleLog;

      t.equal(
        spyReporter.callCount,
        2,
        'reporter must been called 2 times'
        );

      t.true(
        spyReporter.getCall(0).calledWith('testTask', 'strt'),
        '1st: strt'
        );

      t.true(
        spyReporter.getCall(1).calledWith('testTask', 'resolve'),
        '2nd: resolve'
        );
    });
  });