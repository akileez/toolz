// code from dateforate.js
// gotta love the eloquence
function nth (i) {
  return ['th', 'st', 'nd', 'rd'][i % 10 > 3 ? 0 : (i % 100 - i % 10 !== 10) * i % 10]
}

module.exports = nth

// original code from mout:
// function nth(i) {
//     var t = (i % 100);
//     if (t >= 10 && t <= 20) {
//         return 'th';
//     }
//     switch(i % 10) {
//         case 1:
//             return 'st';
//         case 2:
//             return 'nd';
//         case 3:
//             return 'rd';
//         default:
//             return 'th';
//     }
// }
