const path = require('path');
const funcionesTest = require('../src/main');


describe('rutAbsoluta', () => {
  test('deberiaser una funcion', () => {
    expect(typeof funcionesTest.rutAbsoluta).toBe('function');
  });

  test('deberia ser una ruta absoluta', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/src/main.js';
    const output = true;
    expect(funcionesTest.rutAbsoluta(input)).toEqual(output);
  });
});

describe('rutRelativa', () => {
  test('deberiaser una funcion', () => {
    expect(typeof funcionesTest.rutRelativa).toBe('function');
  });

  test('deberia ser una ruta relativa', () => {
    const input = 'README.md';
    const output = '/home/yasmit/LIM011-fe-md-links/README.md';
    expect(funcionesTest.rutRelativa(input)).toEqual(output);
  });
});

describe('rutArchivo', () => {
  test('deberiaser una funcion', () => {
    expect(typeof funcionesTest.rutArchivo).toBe('function');
  });
  it('deberia ser un archivo', () => {
    const input = './README.md';
    const output = true;
    expect(funcionesTest.rutArchivo(input)).toEqual(output);
  });
});

describe('rutDirectorio', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.rutDirectorio).toBe('function');
  });
  it('deberia ser un directorio', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/src';
    const output = true;
    expect(funcionesTest.rutDirectorio(input)).toEqual(output);
  });
});

describe('archiboMd', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.archiboMd).toBe('function');
  });
  it('deberia ser un archivo .md', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/README.md';
    const output = true;
    expect(funcionesTest.archiboMd(input)).toEqual(output);
  });
});

describe('leeContenidoArchivoMd', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.leeContenidoArchivoMd).toBe('function');
  });
  it('deberia retornar en contenido del archivo', () => {
    const input = path.join(process.cwd(), 'prueb/prueba2/ReadmePrueba.md');
    const output = '[Node.js](https://nodejs.org/en/)[Node.js](https:/dejs.org/en/)';
    expect(funcionesTest.leeContenidoArchivoMd(input)).toEqual(output);
  });
});

describe('contenidoDirectorio', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.archiboMd).toBe('function');
  });
  it('deberia retornar el contenido de un directorio', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/prueb';
    const output = ['prueba2', 'readme.md'];
    expect(funcionesTest.contenidoDirectorio(input)).toEqual(output);
  });
});

describe('funcionRecursión', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.funcionRecursión).toBe('function');
  });
  it('deberia retornar un array de archivos .md', () => {
    const input = '/home/yasmit/LIM011-fe-md-links/prueb';
    const output = ['/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md',
      '/home/yasmit/LIM011-fe-md-links/prueb/readme.md'];
    expect(funcionesTest.funcionRecursión(input)).toEqual(output);
  });
});

describe('obtenerLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof funcionesTest.obtenerLinks).toBe('function');
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
    expect(funcionesTest.obtenerLinks(input)).toEqual(output);
  });
});
