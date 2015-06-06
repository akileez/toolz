  function quarter (date) {
    var month = date.getMonth() + 1
    return (Math.ceil(month / 3))
  }

  module.exports = quarter

// Original Code - mout.js
//   function quarter(date){
//     var month = date.getMonth();
//     if (month < 3) return 1;
//     if (month < 6) return 2;
//     if (month < 9) return 3;
//     return 4;
// }