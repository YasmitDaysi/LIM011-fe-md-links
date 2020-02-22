
const lengthArray = (ruta) => ruta.length;
const brokenLink = (data) => data.filter((element) => element.message === 'FAIL').length;

const uniqueLink = (arrayb) => {
  const result = arrayb.map((Element) => Element.href);
  return new Set(result).size;
};

const functionStats = (ruta, option) => {
  let result = '';
  result += `Total : ${lengthArray(ruta)}\n`;
  result += `unique: ${uniqueLink(ruta)}\n`;
  if (option.validate === true) {
    result += `Broken: ${brokenLink(ruta)}\n`;
  }
  return result;
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
