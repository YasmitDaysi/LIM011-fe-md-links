// const fetchMock = require('jest-fetch-mock');
const promesasTest = require('../src/mdLinks.js');

// jest.mock('node-fetch');

describe('funcionValidar', () => {
  test('deberia ser una funcion', () => {
    expect(typeof promesasTest.funcionValidar).toBe('function');
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
      href: 'https://nodejs.org/e/',
      path: '/home/yasmit/LIM011-fe-md-links/prueb/readme.md',
      text: 'Node.js',
      status: 404,
      message: 'FAIL',
    }];
    return promesasTest.funcionValidar('/home/yasmit/LIM011-fe-md-links/prueb').then((resolve) => {
      expect(resolve).toEqual(resultado);
      done();
    });
  });
});

describe('mdLinks', () => {
  test('deberia ser una funcion', () => {
    expect(typeof promesasTest.mdLinks).toBe('function');
  });
  it('deberia retornar array de objetos con las propiedades:href, path, text', (done) => {
    const resultado = [{
      href: 'https://nodejs.org/en/',
      path:
       '/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      text: 'Node.js',
    },
    {
      href: 'https://nodejs.org/e/',
      path: '/home/yasmit/LIM011-fe-md-links/prueb/readme.md',
      text: 'Node.js',
    }];
    return promesasTest.mdLinks('/home/yasmit/LIM011-fe-md-links/prueb', { validate: false }).then((resolve) => {
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
      href: 'https://nodejs.org/e/',
      path: '/home/yasmit/LIM011-fe-md-links/prueb/readme.md',
      text: 'Node.js',
      status: 404,
      message: 'FAIL',
    }];
    return promesasTest.mdLinks('/home/yasmit/LIM011-fe-md-links/prueb', { validate: true }).then((resolve) => {
      expect(resolve).toEqual(resultado);
      done();
    });
  });
});
