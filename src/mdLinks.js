const fetch = require('node-fetch');
const funcionesTest = require('../src/main');

const funcionValidar = (ruta) => {
  const arr = funcionesTest.obtenerLinks(ruta).map((Element) => {
    const obj = {};

    return fetch(Element.href)
      .then((Response) => {
        obj.status = Response.status;
        obj.href = Element.href;
        obj.path = Element.path;
        obj.text = Element.text;
        if ((Response.status >= 200) && (Response.status <= 399)) {
          obj.message = 'OK';
          return obj;
        }
        obj.message = 'FAIL';
        return obj;
      }).catch(() => {
        obj.status = 'no existe';
        obj.href = Element.href;
        obj.path = Element.path;
        obj.text = Element.text;
        obj.message = 'fail';
        return obj;
      });
  });
  return Promise.all(arr);
};

// funcionValidar('/home/yasmit/LIM011-fe-md-links/prueb').then((resolve) => console.log(resolve));

const mdLinks = (ruta, options) => {
  let nuevoRuta = ruta;
  if (funcionesTest.rutAbsoluta(ruta) === false) {
    nuevoRuta = funcionesTest.rutRelativa(ruta);
  }
  if (options.validate === true) {
    return funcionValidar(nuevoRuta);
  }
  return Promise.resolve(funcionesTest.obtenerLinks(nuevoRuta));
};
// mdLinks('/home/yasmit/LIM011-fe-md-links/prueb',
// { validate: true }).then((resolve) => console.log(resolve));

module.exports = {
  funcionValidar,
  mdLinks,
};
