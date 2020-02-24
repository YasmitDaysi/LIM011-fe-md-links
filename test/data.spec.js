const path = require('path');
const funcionesTest = require('../src/main');


describe('absolutePath', () => {
  test('deberiaser una funcion', () => {
    expect(typeof funcionesTest.absolutePath).toBe('function');
  });

  test('deberia ser una ruta absoluta', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/src/main.js';
    const output = true;
    expect(funcionesTest.absolutePath(input)).toEqual(output);
  });
});

describe('getAbsolutePath', () => {
  test('deberiaser una funcion', () => {
    expect(typeof funcionesTest.getAbsolutePath).toBe('function');
  });

  test('deberia ser una ruta relativa', () => {
    const input = 'README.md';
    const output = '/home/yasmit/LIM011-fe-md-links/README.md';
    expect(funcionesTest.getAbsolutePath(input)).toEqual(output);
  });
});

describe('isFile', () => {
  test('deberiaser una funcion', () => {
    expect(typeof funcionesTest.isFile).toBe('function');
  });
  it('deberia ser un archivo', () => {
    const input = './README.md';
    const output = true;
    expect(funcionesTest.isFile(input)).toEqual(output);
  });
});

describe('isDirectory', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.isDirectory).toBe('function');
  });
  it('deberia ser un directorio', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/src';
    const output = true;
    expect(funcionesTest.isDirectory(input)).toEqual(output);
  });
});

describe('isMD', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.isMD).toBe('function');
  });
  it('deberia ser un archivo .md', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/README.md';
    const output = true;
    expect(funcionesTest.isMD(input)).toEqual(output);
  });
});

describe('readFile', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.readFile).toBe('function');
  });
  it('deberia retornar en contenido del archivo', () => {
    const input = path.join(process.cwd(), 'prueb/prueba2/ReadmePrueba.md');
    const output = '[Node.js](https://nodejs.org/en/)[Node.js](https:/dejs.org/en/)';
    expect(funcionesTest.readFile(input)).toEqual(output);
  });
});

describe('readDirectory', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.isMD).toBe('function');
  });
  it('deberia retornar el contenido de un directorio', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/prueb';
    const output = ['prueba2', 'readme.md'];
    expect(funcionesTest.readDirectory(input)).toEqual(output);
  });
});

describe('saveRoutesOfFiles', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.saveRoutesOfFiles).toBe('function');
  });
  it('deberia retornar un array de archivos .md', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/prueb';
    const output = ['/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      '/home/yasmit/LIM011-fe-md-links/prueb/readme.md'];
    expect(funcionesTest.saveRoutesOfFiles(input)).toEqual(output);
  });
});

describe('getAllLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.getAllLinks).toBe('function');
  });
  it('deberia retornau un array con Links, Path y Text', () => {
    const input = path.join(process.cwd(), 'prueb');
    const output = [{
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
    expect(funcionesTest.getAllLinks(input)).toEqual(output);
  });
});
