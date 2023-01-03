'use strict';

const { execute } = require('./communication');

let messages = [];
const outputMock = {
  showResult(msg) {
    messages.push(msg);
  }
};

const fileSystemDefaultMock = {
  checkFile(filePath) {
    throw new Error('checkFile() has been called unexpectedly');
  },
  readFile(filePath) {
    throw new Error('readFile() has been called unexpectedly');
  }
};

beforeEach(() => {
  messages = [];
});

test('No arguments', () => {
  //When
  execute(null, fileSystemDefaultMock, outputMock);

  //Then
  expect(messages).toEqual(['Run communication.js together with .txt file name']);
});

test('File does not exist', () => {
  //Mock
  const fileSystemMock = {
    checkFile(filePath) {
      return false;
    },
    readFile(filePath) {
      throw new Error('readFile() has been called unexpectedly');
    }
  };

  //When
  execute(['', '', '123.txt'], fileSystemMock, outputMock);

  //Then
  expect(messages).toEqual(['File does not exist']);
});

test('Wrong input file', () => {
  //Mock
  const fileSystemMock = {
    checkFile(filePath) {
      return true;
    },
    readFile(filePath) {
      return 'Wrong input file body';
    }
  };

  //When
  execute(['', '', 'input.txt'], fileSystemMock, outputMock);

  //Then
  expect(messages).toEqual(['Incorrect size']);
});

test('Final field', () => {
  //Mock
  const fileSystemMock = {
    checkFile(filePath) {
      return true;
    },
    readFile(filePath) {
      return '7 8\n' +
        '..p.....\n' +
        '.ppp....\n' +
        '..p.....\n' +
        '........\n' +
        '...#....\n' +
        '...#...#\n' +
        '#..#####';
    }
  };

  //When
  execute(['', '', 'input.txt'], fileSystemMock, outputMock);

  //Then
  expect(messages).toEqual(['........\n' +
  '........\n' +
  '..p.....\n' +
  '.ppp....\n' +
  '..p#....\n' +
  '...#...#\n' +
  '#..#####']);
});
