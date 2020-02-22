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
// console.log(opcion);
// const ; validatealidate

// funcionCliNode.cliMdlink(route, opcion).then((resolve) => console.log(resolve));
funcionCliNode.cliMdlink(route, options).then((resolve) => console.log(resolve));

// if (route) {
//   funcionCliNode(route, {}).then((resolve) => console.log(resolve));
// }
// if (arrayElements) {
//   funcionCliNode(route, valitade).then((resolve) => console.log(resolve));
// }
