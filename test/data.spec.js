const path = require('path');
const mainFunctions = require('../src/main');


describe('absolutePath', () => {
  test('deberiaser una funcion', () => {
    expect(typeof mainFunctions.absolutePath).toBe('function');
  });

  test('deberia ser una ruta absoluta', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/src/main.js';
    const output = true;
    expect(mainFunctions.absolutePath(input)).toEqual(output);
  });
});

describe('getAbsolutePath', () => {
  test('deberiaser una funcion', () => {
    expect(typeof mainFunctions.getAbsolutePath).toBe('function');
  });

  test('deberia ser una ruta relativa', () => {
    const input = 'README.md';
    const output = '/home/yasmit/LIM011-fe-md-links/README.md';
    expect(mainFunctions.getAbsolutePath(input)).toEqual(output);
  });
});

describe('isFile', () => {
  test('deberiaser una funcion', () => {
    expect(typeof mainFunctions.isFile).toBe('function');
  });
  it('deberia ser un archivo', () => {
    const input = './README.md';
    const output = true;
    expect(mainFunctions.isFile(input)).toEqual(output);
  });
});

describe('isDirectory', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mainFunctions.isDirectory).toBe('function');
  });
  it('deberia ser un directorio', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/src';
    const output = true;
    expect(mainFunctions.isDirectory(input)).toEqual(output);
  });
});

describe('isMD', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mainFunctions.isMD).toBe('function');
  });
  it('deberia ser un archivo .md', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/README.md';
    const output = true;
    expect(mainFunctions.isMD(input)).toEqual(output);
  });
});

describe('readFile', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mainFunctions.readFile).toBe('function');
  });
  it('deberia retornar en contenido del archivo', () => {
    const input = path.join(process.cwd(), 'prueb/prueba2/ReadmePrueba.md');
    const output = '[Node.js](https://nodejs.org/en/)[Node.js](https:/dejs.org/en/)';
    expect(mainFunctions.readFile(input)).toEqual(output);
  });
});

describe('readDirectory', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mainFunctions.isMD).toBe('function');
  });
  it('deberia retornar el contenido de un directorio', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/prueb';
    const output = ['prueba2', 'readme.md'];
    expect(mainFunctions.readDirectory(input)).toEqual(output);
  });
});

describe('saveRoutesOfFiles', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mainFunctions.saveRoutesOfFiles).toBe('function');
  });
  it('deberia retornar un array de archivos .md', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/prueb';
    const output = ['/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      '/home/yasmit/LIM011-fe-md-links/prueb/readme.md'];
    expect(mainFunctions.saveRoutesOfFiles(input)).toEqual(output);
  });
});

describe('getAllLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mainFunctions.getAllLinks).toBe('function');
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
    expect(mainFunctions.getAllLinks(input)).toEqual(output);
  });
});
