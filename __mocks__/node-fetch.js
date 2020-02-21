const nodeFetch = jest.requireActual('node-fetch');// requiere de node-fetch
const fetchMock = require('fetch-mock').sandbox();// sandbox es uno de sus metodo de fetch-mock lo que hace hacer una simulacion de llamadas y respuesta de la llamada tiene doto los metodos de fetc-mock parahacer llamadas pero sandbox se burla de las llamadas

Object.assign(fetchMock.config, {
  fetch: nodeFetch,
});

fetchMock.mock('https://nodejs.org/en/', 200);
fetchMock.mock('https://nodejs.org/e/', 404);
fetchMock.mock('https:/dejs.org/en/', {
  throws: new TypeError('Failed to fetch'),
});


module.exports = fetchMock;
