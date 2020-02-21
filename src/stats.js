
const lengthArray = (ruta) => ruta.length;

const uniqueLink = (arrayb) => {
  const resultado = arrayb.map((Element) => Element.href);
  return new Set(resultado).size;
};

const brokenLink = (data) => data.filter((element) => element.message === 'FAIL').length;

const functionStats = (ruta, option) => {
  let resultado = '';
  resultado += `Total : ${lengthArray(ruta)}\n`;
  resultado += `unique: ${uniqueLink(ruta)}\n`;
  if (option.validate === true) {
    resultado += `Broken: ${brokenLink(ruta)}\n`;
  }
  return resultado;
};

const validateFalse = (data) => {
  let stringres = '';
  data.forEach((elem) => { stringres += `✅  ${elem.path}  ${elem.href}  ${elem.text}\n `; });
  return stringres;
};

const validateTrue = (data) => {
  let stringres = '';
  data.forEach((Element) => { stringres += `✅   ${Element.href}  ${Element.text}  ${Element.path} ${Element.status} ${Element.message}\n `; });
  return stringres;
};

module.exports = { functionStats, validateFalse, validateTrue };
