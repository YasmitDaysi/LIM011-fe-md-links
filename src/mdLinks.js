const functionValidateLink = require('./validateLink.js');
const validateLinks = require('./main');


const mdLinks = (ruta, options) => {
  let newRoute = ruta;
  if (!validateLinks.absolutePath(ruta)) {
    newRoute = validateLinks.getAbsolutePath(ruta);
  } else if (options.validate) {
    return functionValidateLink.functionValidate(newRoute);
  }
  return Promise.resolve(validateLinks.getAllLinks(newRoute));
};

module.exports = {
  mdLinks,
};
