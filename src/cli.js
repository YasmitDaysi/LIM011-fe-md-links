#!/usr/bin/env node
const funcionCliNode = require('../src/funcionCli.js');

const option = {
  validate: false,
  stats: false,
};
const argumentos = process.argv;
const ruta = argumentos[2];


if (argumentos[3] === '--stats') {
  option.stats = true;
}
if (argumentos[3] === '--validate') {
  option.validate = true;
}
if (argumentos[3] === '--stats' && argumentos[4] === '--validate') {
  option.stats = true;
  option.validate = true;
}
// console.log(opcion);
// const ; validatealidate

// funcionCliNode.condicionCli(ruta, opcion).then((resolve) => console.log(resolve));
funcionCliNode.condicionCli(ruta, option).then((resolve) => console.log(resolve));

// if (ruta) {
//   funcionCliNode(ruta, {}).then((resolve) => console.log(resolve));
// }
// if (argumentos) {
//   funcionCliNode(ruta, valitade).then((resolve) => console.log(resolve));
// }
