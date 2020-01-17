export default {
  longText: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. Since question was regarding clunkiness of property checking, and one regular usecase for that being validation of function argument options objects, thought I\'d mention a library-free short way of testing existence of multiple properties. Disclaimer: It does require ECMAScript 5 (but IMO anyone still using IE8 deserves a broken web).',
  maynardBirthDate: new Date('1964-04-17'),
  someSymbol: Symbol('Fortune'),
  capitalCityMap: new Map([['Canada', 'Ottawa'], ['Iceland', 'Reykjavík']]),
  regularArray: [0, 0.25, 0.5, {wow: 'surprize! there is is an object among numbers'}, 0.75],
  funError: new RangeError('Pizza size is too big'),
};