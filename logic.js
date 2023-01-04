'use strict';

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Field {
  constructor(width, height, figure, landscape) {
    this.width = width;
    this.height = height;
    this.figure = figure;
    this.landscape = landscape;
  }
}

function getFigure(array) {
  const figure = [];

  for (let line = 0; line < array.length; line++) {
    for (let column = 0; column < array[line].length; column++) {
      if (array[line][column] === 'p') {
        figure.push(new Dot(column, line));
      }
    }
  }

  return figure;
}

function getLandscape(array) {
  const landscape = [];

  for (let line = 0; line < array.length; line++) {
    for (let column = 0; column < array[line].length; column++) {
      if (array[line][column] === '#') {
        landscape.push(new Dot(column, line));
      }
    }
  }

  return landscape;
}

function move(field) {
  let isMovable = true;

  //Check if figure is on landscape
  for (let i = 0; i < field.figure.length; i++) {
    for (let k = 0; k < field.landscape.length; k++) {
      if (field.figure[i].x === field.landscape[k].x &&
        field.figure[i].y + 1 === field.landscape[k].y) {
        isMovable = false;
      }
    }
  }

  //Check if figure is outside the field
  for (let i = 0; i < field.figure.length; i++) {
    if (field.figure[i].y === field.height - 1) {
      isMovable = false;
    }
  }

  if (isMovable === true) {
    for (let i = 0; i < field.figure.length; i++) {
      field.figure[i].y += 1;
    }
  }
  return field;
}

function getFinalField(field) {
  for (let i = 0; i < field.height; i++) {
    field = move(field);
  }
  return field;
}

function getOutput(field) {
  const newArray = [];
  for (let i = 0; i < field.height; i++) {
    newArray.push([]);
    for (let k = 0; k < field.width; k++) {
      newArray[i].push('.');
    }
  }

  for (let i = 0; i < field.figure.length; i++) {
    newArray[field.figure[i].y][field.figure[i].x] = 'p';
  }

  for (let i = 0; i < field.landscape.length; i++) {
    newArray[field.landscape[i].y][field.landscape[i].x] = '#';
  }

  for (let i = 0; i < field.height; i++) {
    newArray[i] = newArray[i].join('');
  }
  return newArray.join('\n');
}

module.exports = { Dot, Field, getFigure, getLandscape, move, getFinalField, getOutput };
