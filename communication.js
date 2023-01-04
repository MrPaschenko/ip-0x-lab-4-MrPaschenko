'use strict';

const fs = require('fs');

const { getOutput, Field, getFigure, getLandscape, getFinalField} = require('./logic');
const { writeOutput, parseInput } = require('./inputOutput');

function execute(args, fileSystem, output) {
  const regEx = /^.+\.txt$/;
  if (!args) {
    output.showResult('Run communication.js together with .txt file name');
    return;
  }

  if (!regEx.test(args)) {
    output.showResult('Enter only .txt file name');
    return;
  }

  if (!fileSystem.checkFile(args)) {
    output.showResult('File does not exist');
    return;
  }

  const fileContent = fileSystem.readFile(args);
  let isError = false;
  let parsedContent;
  try {
    parsedContent = parseInput(fileContent);
  } catch (e) {
    isError = e.message;
  }

  if (isError) {
    output.showResult(isError);
  } else {
    const field = new Field(
      parsedContent.width,
      parsedContent.height,
      getFigure(parsedContent.array),
      getLandscape(parsedContent.array)
    );

    const finalField = getFinalField(field)
    const finalFieldString = getOutput(finalField);

    output.showResult(finalFieldString);
    writeOutput(finalFieldString);
  }
}

const fileSystem = {
  checkFile(filePath) {
    return fs.existsSync(filePath);
  },
  readFile(filePath) {
    return fs.readFileSync((filePath), 'utf-8');
  }
};

const output = {
  showResult(msg) {
    console.log(msg);
  }
};

execute(process.argv[2], fileSystem, output);

module.exports = { execute };
