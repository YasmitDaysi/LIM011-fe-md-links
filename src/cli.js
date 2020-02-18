#!/usr/bin/env node
const funcionLinks = require('../src/mdLinks.js')

if (process.argv[3] === '--validate') {
  funcionLinks.mdLinks(process.argv[2], { validate: true }).then((Response) => {
    console.log(Response);
  });
}
if (process.argv[2]) {
  funcionLinks.mdLinks(process.argv[2], { validate: false }).then((Response) => {
    console.log(Response);
  });
}
