/**
 * ES2015
 */
module.exports = {
  // require braces in arrow function body
  'arrow-body-style': [2, 'as-needed'],

  // require parens in arrow function arguments
  'arrow-parens': [0, 'always'],

  // require space before/after arrow function's arrow
  'arrow-spacing': [2, {
    'before': true,
    'after': true
  }],

  // verify calls of super() in constructors
  'constructor-super': 2,

  // enforce spacing around the * in generator functions
  'generator-star-spacing': [2, {
    'before': true,
    'after': true
  }],

  // disallow arrow functions where a condition is expected
  'no-arrow-condition': 2,

  // disallow modifying variables of class declarations
  'no-class-assign': 2,

  // disallow modifying variables that are declared using const
  'no-const-assign': 2,

  // disallow duplicate name in class members
  'no-dupe-class-members': 2,

  // disallow use of this/super before calling super() in constructors.
  'no-this-before-super': 2,

  // require let or const instead of var
  'no-var': 0,

  // require method and property shorthand syntax for object literals
  'object-shorthand': 2,

  // suggest using arrow functions as callbacks
  'prefer-arrow-callback': 0,

  // suggest using const declaration for variables that are never modified after declared
  'prefer-const': 0,

  // suggest using the spread operator instead of .apply().
  'prefer-spread': 0,

  // suggest using Reflect methods where applicable
  'prefer-reflect': 0,

  // suggest using template literals instead of strings concatenation
  'prefer-template': 0,

  // disallow generator functions that do not have yield
  'require-yield': 2
};