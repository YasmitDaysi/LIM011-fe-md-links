const validateLink = require('./mdLinks.js');
const linkCount = require('./stats.js');

const cliMdlink = (route, option) => {
  let result;
  if (!route) {
    result = new Promise((resolve) => resolve('You have to enter the path of your Markdown file'));
  } else if (!option.validate && !option.stats) {
    result = validateLink.mdLinks(route, { validate: false })
      .then((resolve) => linkCount.validateFalse(resolve));
  } else if (option.stats && option.validate) {
    result = validateLink.mdLinks(route, { validate: true })
      .then((resolve) => linkCount.functionStats(resolve, { validate: true }));
  } else if (option.validate) {
    result = validateLink.mdLinks(route, { validate: true })
      .then((resolve) => linkCount.validateTrue(resolve));
  } else if (option.stats) {
    result = validateLink.mdLinks(route, { validate: false })
      .then((resolve) => linkCount.functionStats(resolve, { validate: false }));
  }
  return result;
};

module.exports = { cliMdlink };
