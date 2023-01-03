'use strict';

const {
  Dot,
  Field,
  getFigure,
  getLandscape,
  move,
  getFinalField,
  getOutput
} = require('./logic');

test('Test getFigure', () => {
  expect(getFigure([
    '..p.....',
    '.ppp....',
    '..p.....',
    '........',
    '...#....',
    '...#...#',
    '#..#####'
  ])).toEqual([
    new Dot(2, 0),
    new Dot(1, 1),
    new Dot(2, 1),
    new Dot(3, 1),
    new Dot(2, 2)
  ]);
});

test('Test getLandscape', () => {
  expect(getLandscape([
    '..p.....',
    '.ppp....',
    '..p.....',
    '........',
    '...#....',
    '...#...#',
    '#..#####'
  ])).toEqual([
    new Dot(3, 4),
    new Dot(3, 5),
    new Dot(7, 5),
    new Dot(0, 6),
    new Dot(3, 6),
    new Dot(4, 6),
    new Dot(5, 6),
    new Dot(6, 6),
    new Dot(7, 6)
  ]);
});

test('Test move', () => {
  const field = new Field(8, 7, [
    new Dot(2, 0),
    new Dot(1, 1),
    new Dot(2, 1),
    new Dot(3, 1),
    new Dot(2, 2)
  ], [
    new Dot(3, 4),
    new Dot(3, 5),
    new Dot(7, 5),
    new Dot(0, 6),
    new Dot(3, 6),
    new Dot(4, 6),
    new Dot(5, 6),
    new Dot(6, 6),
    new Dot(7, 6)
  ]);

  const expectedField = new Field(8, 7, [
    new Dot(2, 1),
    new Dot(1, 2),
    new Dot(2, 2),
    new Dot(3, 2),
    new Dot(2, 3)
  ], [
    new Dot(3, 4),
    new Dot(3, 5),
    new Dot(7, 5),
    new Dot(0, 6),
    new Dot(3, 6),
    new Dot(4, 6),
    new Dot(5, 6),
    new Dot(6, 6),
    new Dot(7, 6)
  ]);

  expect(move(field)).toEqual(expectedField);
});

test('Test getFinalField', () => {
  const field = new Field(8, 7, [
    new Dot(2, 0),
    new Dot(1, 1),
    new Dot(2, 1),
    new Dot(3, 1),
    new Dot(2, 2)
  ], [
    new Dot(3, 4),
    new Dot(3, 5),
    new Dot(7, 5),
    new Dot(0, 6),
    new Dot(3, 6),
    new Dot(4, 6),
    new Dot(5, 6),
    new Dot(6, 6),
    new Dot(7, 6)
  ]);

  const expectedField = new Field(8, 7, [
    new Dot(2, 2),
    new Dot(1, 3),
    new Dot(2, 3),
    new Dot(3, 3),
    new Dot(2, 4)
  ], [
    new Dot(3, 4),
    new Dot(3, 5),
    new Dot(7, 5),
    new Dot(0, 6),
    new Dot(3, 6),
    new Dot(4, 6),
    new Dot(5, 6),
    new Dot(6, 6),
    new Dot(7, 6)
  ]);

  expect(getFinalField(field)).toEqual(expectedField);
});

test('Test getOutput', () => {
  const field = new Field(8, 7, [
    new Dot(2, 2),
    new Dot(1, 3),
    new Dot(2, 3),
    new Dot(3, 3),
    new Dot(2, 4)
  ], [
    new Dot(3, 4),
    new Dot(3, 5),
    new Dot(7, 5),
    new Dot(0, 6),
    new Dot(3, 6),
    new Dot(4, 6),
    new Dot(5, 6),
    new Dot(6, 6),
    new Dot(7, 6)
  ]);

  expect(getOutput(field)).toEqual('........\n' +
    '........\n' +
    '..p.....\n' +
    '.ppp....\n' +
    '..p#....\n' +
    '...#...#\n' +
    '#..#####');
});
