const fetch = require('node-fetch');
const validateLinks = require('../src/main');

const functionValidate = (ruta) => {
  const arrPromise = validateLinks.getAllLinks(ruta).map((Element) => {
    const obj = {};

    return fetch(Element.href)
      .then((resolve) => {
        obj.status = resolve.status;
        obj.href = Element.href;
        obj.path = Element.path;
        obj.text = Element.text;
        if ((resolve.status >= 200) && (resolve.status <= 399)) {
          obj.message = 'OK';
          return obj;
        }
        obj.message = 'FAIL';
        return obj;
      }).catch(() => {
        obj.status = 'does not exist';
        obj.href = Element.href;
        obj.path = Element.path;
        obj.text = Element.text;
        obj.message = 'fail';
        return obj;
      });
  });
  return Promise.all(arrPromise);
};

const mdLinks = (ruta, options) => {
  let newRoute = ruta;
  if (!validateLinks.absolutePath(ruta)) {
    newRoute = validateLinks.getAbsolutePath(ruta);
  } else if (options.validate) {
    return functionValidate(newRoute);
  }
  return Promise.resolve(validateLinks.getAllLinks(newRoute));
};

module.exports = {
  functionValidate,
  mdLinks,
};
