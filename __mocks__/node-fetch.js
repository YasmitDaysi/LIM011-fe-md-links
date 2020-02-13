const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});

fetchMock.mock('https://nodejs.org/en/', 200);
fetchMock.mock('https://nodejs.org/e/', 404);

module.exports = fetchMock;
