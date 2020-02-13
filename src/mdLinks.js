const fetchNode = require('node-fetch');
const funcionesTest = require('../src/main');


const funcionValidar = (ruta) => {
  const guardarP = [];

  funcionesTest.obtenerLinks(ruta).forEach((Element) => {
    const obj = { ...Element };

    guardarP.push(fetchNode(Element.href)
      .then((Response) => {
        if ((Response.status >= 200) && (Response.status <= 399)) {
          obj.status = Response.status;
          obj.message = 'OK';
          // console.log('principio', Element);
          return obj;
        }
        obj.status = Response.status;
        obj.message = 'FAIL';
        // console.log('finallll', obj);

        return obj;
      }).catch(() => ({
        status: 'no existe',
        mensaje: 'fail',
      })));
  });
  return Promise.all(guardarP);
};
// funcionValidar('/home/yasmit/LIM011-fe-md-links/prueb').then((Response) =>
// console.log(Response));

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
mdLinks('/home/yasmit/LIM011-fe-md-links/prueb', { validate: true }).then((Response) => console.log(Response));
// console.log( typeof mdLinks('/home/yasmit/LIM011-fe-md-links/prueb', { validate: false }));
module.exports = {
  funcionValidar,
  mdLinks,
};
