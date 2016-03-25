'use strict';
const through = require('../../../src/promise/promtie/through');
const each = require('../../../src/promise/promtie/each');
const stdio = require('./stdio');

function calculateSpeed(node) {
  const duration = node.info.duration;
  const slow = node.type === 'step' ? node.options.slow :
    node.steps.reduce((sum, step) => sum + step.options.slow, 0);
  if (slow > 0) {
    if (duration >= slow) {
      return 'slow';
    }
    if (duration >= slow / 2) {
      return 'medium';
    }
  }
  return 'fast';
}

function collectInfo(node) {
  node.info = {
    startedAt: Date.now(),
  };
  return {
    ok(data) {
      node.info.finishedAt = Date.now();
      node.info.duration = node.info.finishedAt - node.info.startedAt;
      node.info.speed = calculateSpeed(node);
      return data;
    },
    fail(err) {
      node.info.error = err;
      throw err;
    },
  };
}

function hookStepStdio(step, notify) {
  const stdioPromises = [];
  if (step.options.mute.stdout) {
    stdio.stdout.hook(() => {});
  } else {
    stdio.stdout.hook((str, encoding) => {
      stdioPromises.push(notify(step, 'write.stdout', str, encoding));
    });
  }
  if (step.options.mute.stderr) {
    stdio.stderr.hook(() => {});
  } else {
    stdio.stderr.hook((str, encoding) => {
      stdioPromises.push(notify(step, 'write.stderr', str, encoding));
    });
  }
  return () => {
    stdio.unhook();
    return Promise.all(stdioPromises);
  };
}

function runStep(step, notify) {
  // Fill initial info
  const finalizeInfo = collectInfo(step);
  // Hook into the stdio
  const unhookStdio = hookStepStdio(step, notify);
  // Run actually step function
  return step.fn(step.plan.data)
    // Finalize info collection
    .then(finalizeInfo.ok, finalizeInfo.fail)
    // Unhook stdio & wait for it to flush
    .then(through(unhookStdio), through(unhookStdio))
    // Notify success or failure
    .then(() => {
      return notify(step, 'ok');
    }, (err) => {
      let end;
      return notify(step, 'fail', err)
        .then(through(end = () => {
          // Should we ignore the error?
          if (step.options.fatal) {
            throw err;
          }
        }), through(end));
    });
}

function runPhase(phase, notify) {
  // Fill initial info
  const finalizeInfo = collectInfo(phase);
  // Run each phase items in series
  return each(phase.children, (child) => run(child, notify))
    // Finalize info collection
    .then(finalizeInfo.ok, finalizeInfo.fail)
    // Notify success or failure
    .then(() => {
      return notify(phase, 'ok');
    }, (err) => {
      const fail = () => {
        throw err; };
      return notify(phase, 'fail', err)
        .then(through(fail), through(fail));
    });
}

function run(node, notify) {
  const finish = () => notify(node, 'finish');
  // Notify start
  return notify(node, 'start')
    // Run the phase or step
    .then(() => {
      return node.type === 'step' ?
        runStep(node, notify) :
        runPhase(node, notify);
    })
    // Notify finish
    .then(through(finish), through(finish));
}
module.exports = run;
