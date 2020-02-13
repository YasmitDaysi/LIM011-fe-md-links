const fetch = require('node-fetch');
const funcionesTest = require('../src/main');

const funcionValidar = (ruta) => {
  const guardarP = [];

  funcionesTest.obtenerLinks(ruta).forEach((Element) => {
    const obj = { ...Element };

    guardarP.push(fetch(Element.href)
      .then((Response) => {
        if ((Response.status >= 200) && (Response.status <= 399)) {
          obj.status = Response.status;
          obj.message = 'OK';
          return obj;
        }
        obj.status = Response.status;
        obj.message = 'FAIL';

        return obj;
      }).catch(() => ({
        status: 'no existe',
        mensaje: 'fail',
      })));
  });
  return Promise.all(guardarP);
};

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
mdLinks('/home/yasmit/LIM011-fe-md-links/prueb', { validate: true });
module.exports = {
  funcionValidar,
  mdLinks,
};
