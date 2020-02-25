const path = require('path');

jest.mock('node-fetch');

const mdLinksFunctions = require('../src/mdLinks');
const validateLinkFunctions = require('../src/validateLink');


describe('functionValidate', () => {
  test('deberia ser una funcion', () => {
    expect(typeof validateLinkFunctions.functionValidate).toBe('function');
  });
  it('deberia retornar array de objetos con las propiedades:href, path, text, status, message', (done) => {
    const resultado = [{
      href: 'https://nodejs.org/en/',
      path:
     '/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      text: 'Node.js',
      status: 200,
      message: 'OK',
    },
    {
      href: 'https:/dejs.org/en/',
      path:
     '/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      text: 'Node.js',
      status: 'does not exist',
      message: 'fail',
    },
    {
      href: 'https://nodejs.org/e/',
      path: '/home/yasmit/LIM011-fe-md-links/prueb/readme.md',
      text: 'Node.js',
      status: 404,
      message: 'FAIL',
    }];
    return validateLinkFunctions.functionValidate(path.join(process.cwd(), 'prueb')).then((resolve) => {
      expect(resolve).toEqual(resultado);
      done();
    });
  });
});

describe('mdLinks', () => {
  test('deberia ser una funcion', () => {
    expect(typeof mdLinksFunctions.mdLinks).toBe('function');
  });
  it('deberia retornar array de objetos con las propiedades:href, path, text', (done) => {
    const resultado = [{
      href: 'https://nodejs.org/en/',
      path:
     '/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      text: 'Node.js',
    },
    {
      href: 'https:/dejs.org/en/',
      path:
     '/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      text: 'Node.js',
    },
    {
      href: 'https://nodejs.org/e/',
      path: '/home/yasmit/LIM011-fe-md-links/prueb/readme.md',
      text: 'Node.js',
    }];
    return mdLinksFunctions.mdLinks(path.join(process.cwd(), 'prueb'), { validate: false }).then((resolve) => {
      expect(resolve).toEqual(resultado);
      done();
    });
  });
  it('deberia retornar array de objetos con las propiedades:href, path, text, status, message', (done) => {
    const resultado = [{
      href: 'https://nodejs.org/en/',
      path:
     '/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      text: 'Node.js',
      status: 200,
      message: 'OK',
    },
    {
      href: 'https:/dejs.org/en/',
      path:
     '/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      text: 'Node.js',
      status: 'does not exist',
      message: 'fail',
    },
    {
      href: 'https://nodejs.org/e/',
      path: '/home/yasmit/LIM011-fe-md-links/prueb/readme.md',
      text: 'Node.js',
      status: 404,
      message: 'FAIL',
    }];
    mdLinksFunctions.mdLinks(path.join(process.cwd(), 'prueb'), { validate: true }).then((resolve) => {
      expect(resolve).toEqual(resultado);
      done();
    });
  });
});
