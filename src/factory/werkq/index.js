// https://github.com/jmversteeg/worq
// MIT © JM Versteeg

'use strict';

// const _ = require('lodash');
const defaults = require('../../object/defaults')
const times = require('../../array/times')
const map = require('../../array/map')
const find =  require('../../array/find')
const Job = require('./Job');
const Thread = require('./Thread');
const Promise = require('../../async/pinkie-promise');

/*
  Run promises in series or with a configurable concurrency limit
    const Queue = require('worq');
    let queue = new Queue();

    queue.run([
      // these functions will be executed in series
      () => somePromisingFunction(),
      () => someOtherPromisingFunction(),
      () => someNormalFunction()
    ]).then(results => {
      // results will be an array containing the return / fulfillment values
    });

*/

/**
 * Contains the options for the Worqer constructor
 * @typedef {Object} QueueOptions
 * @property {number} [concurrency=1] The number of jobs that can run simultaneously
 */

class Queue {

  /**
   * Creates a new Queue
   * @param {QueueOptions} [options] Options for the Queue
   * @constructor
   */
  constructor(options) {
    this.options = _.defaults({}, options, {
      concurrency: 1
    }, options);
    this.queue = [];
    this.threads = _.times(this.options.concurrency, () => new Thread());
  }

  /**
   * Runs the given jobs, and returns a promise for an array containing the fulfillment values in the same order
   * @param {Array.<Function>} fns
   * @returns {Promise.<Array.<*>>}
   */
  run(fns) {
    let jobs = _.map(fns, job => new Job(job));
    this.queue = this.queue.concat(jobs);
    this.processQueue();
    return Promise.all(_.map(jobs, job => this.awaitCompletion(job).catch(err => {
      this.cancel();
      throw err;
    })));
  }

  /**
   * Returns a promise for the completion of the given job
   * @param {Job} job
   * @returns {Promise}
   */
  awaitCompletion(job) {
    return new Promise((fulfill, reject) => {
      job.once('fulfilled', result => fulfill(result));
      job.once('rejected', error => reject(error));
    });
  }

  /**
   * Processes the job queue. This method is invoked every time a job finishes running and when a new job is added
   * @private
   */
  processQueue() {
    let thread;
    while (this.hasJobsPending() && (thread = this.getOpenThread()) !== undefined) {
      thread.run(this.queue.shift()).then(() => this.processQueue());
    }
  }

  /**
   * Gets the first open thread in the thread stack, or if there are no open threads, returns undefined
   * @returns {Thread|undefined}
   * @private
   */
  getOpenThread() {
    return _.find(this.threads, thread => !thread.isPending());
  }

  /**
   * Determines whether there are jobs in the queue
   * @returns {boolean}
   */
  hasJobsPending() {
    return !!this.queue.length;
  }

  /**
   * Cancels the remaining jobs
   */
  cancel() {
    this.queue = [];
  }

  /**
   * Instantiate a new queue and run the given jobs
   * @param {Array.<Function>} fns
   * @returns {Promise.<Array.<*>>}
   */
  static run(fns) {
    let queue = new Queue();
    return queue.run(fns);
  }
}

module.exports = Queue;

