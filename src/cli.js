#!/usr/bin/env node
const funcionCliNode = require('../src/cliCondition.js');

const options = {
  validate: false,
  stats: false,
};
const arrayElements = process.argv;
const route = arrayElements[2];


if (arrayElements[3] === '--stats') {
  options.stats = true;
}
if (arrayElements[3] === '--validate') {
  options.validate = true;
}
if (arrayElements[3] === '--stats' && arrayElements[4] === '--validate') {
  options.stats = true;
  options.validate = true;
}
funcionCliNode.cliMdlink(route, options).then((resolve) => console.log(resolve));
