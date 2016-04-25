var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/abbreviate')
var t = painless.assert

var abbr = require('../../../src/number/abbreviate')

test('should abbreviate numbers to thousands, millions and billions', function () {
  t.is( abbr(15   ), '0K'   );
  t.is( abbr(55   ), '0.1K' );
  t.is( abbr(500  ), '0.5K' );
  t.is( abbr(910  ), '0.9K' );

  t.is( abbr(999    ), '1K'    );
  t.is( abbr(999.9  ), '1K'    );
  t.is( abbr(999.99 ), '1K'    );
  t.is( abbr(1000   ), '1K'    );
  t.is( abbr(1000.1 ), '1K'    );
  t.is( abbr(1001   ), '1K'    );
  t.is( abbr(1100   ), '1.1K'  );
  t.is( abbr(5721   ), '5.7K'  );

  t.is( abbr(999000    ), '999K'   );
  t.is( abbr(999900    ), '999.9K' );
  t.is( abbr(999990    ), '1M'     ); // round
  t.is( abbr(999999    ), '1M'     );
  t.is( abbr(1000000   ), '1M'     );
  t.is( abbr(1000000.1 ), '1M'     );
  t.is( abbr(1000101   ), '1M'     );
  t.is( abbr(1100000   ), '1.1M'   );
  t.is( abbr(5721000   ), '5.7M'   );
  t.is( abbr(9876543   ), '9.9M'   ); // round

  t.is( abbr(999000000    ), '999M'   );
  t.is( abbr(999900000    ), '999.9M' );
  t.is( abbr(999990000    ), '1B'     ); //round
  t.is( abbr(999999999    ), '1B'     );
  t.is( abbr(1000000000   ), '1B'     );
  t.is( abbr(1000000000.1 ), '1B'     );
  t.is( abbr(1000000001   ), '1B'     );
  t.is( abbr(1100000000   ), '1.1B'   );
  t.is( abbr(5721000000   ), '5.7B'   );
  t.is( abbr(9876543210   ), '9.9B'   ); // round
});


test('should allow custom nDigits', function () {
  t.is( abbr(15  , 2 ), '0.02K' );
  t.is( abbr(55  , 2 ), '0.06K' );
  t.is( abbr(500 , 2 ), '0.5K'  );
  t.is( abbr(910 , 2 ), '0.91K' );

  t.is( abbr(999    , 2 ), '1K'    );
  t.is( abbr(999.9  , 2 ), '1K'    );
  t.is( abbr(999.99 , 2 ), '1K'    );
  t.is( abbr(1000   , 2 ), '1K'    );
  t.is( abbr(1000.1 , 2 ), '1K'    );
  t.is( abbr(1001   , 2 ), '1K'    );
  t.is( abbr(1100   , 2 ), '1.1K'  );
  t.is( abbr(5721   , 2 ), '5.72K' );

  t.is( abbr(999000    , 2 ), '999K'   );
  t.is( abbr(999900    , 2 ), '999.9K' );
  t.is( abbr(999990    , 2 ), '999.99K');
  t.is( abbr(999999    , 2 ), '1M'     ); //round
  t.is( abbr(1000000   , 2 ), '1M'     );
  t.is( abbr(1000000.1 , 2 ), '1M'     );
  t.is( abbr(1000001   , 2 ), '1M'     );
  t.is( abbr(1100000   , 2 ), '1.1M'   );
  t.is( abbr(5721000   , 2 ), '5.72M'  );
  t.is( abbr(9876543   , 2 ), '9.88M'  ); //round

  t.is( abbr(999000000    , 2 ), '999M'   );
  t.is( abbr(999900000    , 2 ), '999.9M' );
  t.is( abbr(999990000    , 2 ), '999.99M');
  t.is( abbr(999999999    , 2 ), '1B'     ); //round
  t.is( abbr(1000000000   , 2 ), '1B'     );
  t.is( abbr(1000000000.1 , 2 ), '1B'     );
  t.is( abbr(1000000001   , 2 ), '1B'     );
  t.is( abbr(1100000000   , 2 ), '1.1B'   );
  t.is( abbr(5721000000   , 2 ), '5.72B'  );
  t.is( abbr(9876543210   , 2 ), '9.88B'  ); // round
});

test('should allow custom dictionary', function () {
  var dict = {
    thousand : ' mil',
    million : ' Mi',
    billion : ' Bi'
  };

  t.is( abbr(123456, 1, dict) , '123.5 mil' );
  t.is( abbr(12345678, 1, dict) , '12.3 Mi' );
  t.is( abbr(1234567890, 1, dict) , '1.2 Bi' );

});


test('should work with null', function () {
  t.is( abbr(null) , '0K' );
  t.is( abbr('') , '0K' );
});

test('should work with strings', function () {
  t.is( abbr('2345'), '2.3K' );
});
