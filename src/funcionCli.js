const validarLink = require('./mdLinks.js');
const conteoLinks = require('./stats.js');

const condicionCli = (ruta, option) => {
  console.log(ruta,option);

  let resultado;
  if (ruta === undefined) {
    resultado = new Promise((resolve) => resolve('tiene que ingresar una ruta relativa o absoluta'));
  } else if (!option.validate && !option.stats) {
    resultado = validarLink.mdLinks(ruta, { validate: false })
      .then((resolve) => conteoLinks.validateFalse(resolve));
  } else if (option.stats && option.validate) {
    resultado = validarLink.mdLinks(ruta, { validate: true })
      .then((resolve) => conteoLinks.functionStats(resolve, { validate: true }));
  } else if (option.validate) {
    resultado = validarLink.mdLinks(ruta, { validate: true })
      .then((resolve) => conteoLinks.validateTrue(resolve));
  } else if (option.stats) {
    resultado = validarLink.mdLinks(ruta, { validate: false })
      .then((resolve) => conteoLinks.functionStats(resolve, { validate: false }));
  }
  return resultado;
};

// condicionCli('/home/yasmit/LIM011-fe-md-links/prueb', {})
// .then((resolve) => console.log(resolve));

module.exports = { condicionCli };
