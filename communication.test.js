'use strict';

const { execute, fileSystem, output } = require('./communication');

afterEach(() => {
  jest.restoreAllMocks();
});

test('No arguments', () => {
  //When
  jest.spyOn(output, 'showResult')
    .mockImplementation(msg => console.log(msg));

  execute(null, fileSystem, output, null);

  //Then
  const messages = output.showResult.mock.calls[0];
  expect(messages).toEqual(['Run communication.js together with .txt file name']);
});

test('File does not exist', () => {
  //When
  jest.spyOn(output, 'showResult')
    .mockImplementation(msg => console.log(msg));

  jest.spyOn(fileSystem, 'checkFile')
    .mockImplementation(() => false);

  execute('123.txt', fileSystem, output, null);

  //Then
  const messages = output.showResult.mock.calls[0];
  expect(messages).toEqual(['File does not exist']);
});

test('Wrong input file', () => {
  //When
  jest.spyOn(output, 'showResult')
    .mockImplementation(msg => console.log(msg));

  jest.spyOn(fileSystem, 'checkFile')
    .mockImplementation(() => true);
  jest.spyOn(fileSystem, 'readFile')
    .mockImplementation(() => 'Wrong input file body');

  execute(['', '', 'input.txt'], fileSystem, output);

  //Then
  const messages = output.showResult.mock.calls[0];
  expect(messages).toEqual(['Incorrect size']);
});

test('Final field', () => {
  //When
  jest.spyOn(output, 'showResult')
    .mockImplementation(msg => console.log(msg));

  jest.spyOn(fileSystem, 'checkFile')
    .mockImplementation(() => true);
  jest.spyOn(fileSystem, 'readFile')
    .mockImplementation(() => '7 8\n' +
      '..p.....\n' +
      '.ppp....\n' +
      '..p.....\n' +
      '........\n' +
      '...#....\n' +
      '...#...#\n' +
      '#..#####');

  execute(['', '', 'input.txt'], fileSystem, output);

  //Then
  const messages = output.showResult.mock.calls[0];
  expect(messages).toEqual(['........\n' +
  '........\n' +
  '..p.....\n' +
  '.ppp....\n' +
  '..p#....\n' +
  '...#...#\n' +
  '#..#####']);
});
