const fetch = require('node-fetch');
const validateLinks = require('./main');

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

module.exports = {
  functionValidate,
};
