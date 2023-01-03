'use strict';

const fs = require('fs');

function parseInput(string) {
  const generalArray = string.split('\n');

  if (/^\d+ \d+$/.test(generalArray[0]) === false) {
    throw new Error('Incorrect size');
  }

  const width = parseInt(generalArray[0].split(' ')[1]);
  if (width < 1) {
    throw new Error('Incorrect width');
  }

  const height = parseInt(generalArray[0].split(' ')[0]);
  if (height < 1) {
    throw new Error('Incorrect height');
  }

  const array = generalArray.slice(1, 1 + height);
  if (array.length !== height) {
    throw new Error('Incorrect height');
  }
  for (const element of array) {
    if (/^[.p#]*$/.test(element) === false) {
      throw new Error('Incorrect symbol');
    }
    if (element.length !== width) {
      throw new Error('Incorrect width');
    }
  }

  return {
    width,
    height,
    array,
  };
}

function writeOutput(string) {
  fs.writeFileSync('output.txt', string);
}

module.exports = { parseInput, writeOutput };
