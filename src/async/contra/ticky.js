// https://github.com/bevacqua/ticky (MIT)

// Run a callback as soon as possible using one of the following:
// -setImmediate
// -process.nextTick
// -setTimeout

var si = typeof setImmediate === 'function'
var tick

if (si) tick = function (fn) {setImmediate(fn)}
else if (typeof process !== undef && process.nextTick) tick = process.nextTick;
else tick = function (fn) {setTimeout(fn, 0)}

module.exports = tick
