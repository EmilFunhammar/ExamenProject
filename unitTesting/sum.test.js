/* eslint-disable jest/no-identical-title */
const emil = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(emil(2, 2)).toBe(4);
});

/* test('adds 1 + 2 to equal 3', () => {
  expect(sum(2, 2)).toBe(4);
}); */
