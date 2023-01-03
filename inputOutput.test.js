'use strict';

const { parseInput, writeOutput } = require('./inputOutput');

test('Parse input (1)', () => {
  const fileContent = '7 8\n' +
    '..p.....\n' +
    '.ppp....\n' +
    '..p.....\n' +
    '........\n' +
    '...#....\n' +
    '...#...#\n' +
    '#..#####';

  const expectedOutput = {
    width: 8,
    height: 7,
    array: [
      '..p.....',
      '.ppp....',
      '..p.....',
      '........',
      '...#....',
      '...#...#',
      '#..#####'
    ]
  };

  expect(parseInput(fileContent)).toEqual(expectedOutput);
});

test('Parse input (2)', () => {
  const fileContent = '6 8\n' +
    '..p.....\n' +
    '.ppp....\n' +
    '..pp....\n' +
    '...p..#.\n' +
    '......#.\n' +
    '...#..##';

  const expectedOutput = {
    width: 8,
    height: 6,
    array: [
      '..p.....',
      '.ppp....',
      '..pp....',
      '...p..#.',
      '......#.',
      '...#..##'
    ]
  };

  expect(parseInput(fileContent)).toEqual(expectedOutput);
});

test('Wrong height', () => {
  const fileContent = '9 8\n' +
    '..p.....\n' +
    '.ppp....\n' +
    '..pp....\n' +
    '...p..#.\n' +
    '......#.\n' +
    '...#..##';

  let error = '';
  try {
    parseInput(fileContent);
  } catch (e) {
    error = e.message;
  }

  expect(error).toEqual('Incorrect height');
});

test('Wrong width', () => {
  const fileContent = '6 7\n' +
    '..p.....\n' +
    '.ppp....\n' +
    '..pp....\n' +
    '...p..#.\n' +
    '......#.\n' +
    '...#..##';

  let error = '';
  try {
    parseInput(fileContent);
  } catch (e) {
    error = e.message;
  }

  expect(error).toEqual('Incorrect width');
});

test('Wrong symbol', () => {
  const fileContent = '6 8\n' +
    '..p.....\n' +
    '.ppp....\n' +
    '..pp....\n' +
    '...p..#.\n' +
    '.x....#.\n' +
    '...#..##';

  let error = '';
  try {
    parseInput(fileContent);
  } catch (e) {
    error = e.message;
  }

  expect(error).toEqual('Incorrect symbol');
});
