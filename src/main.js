const path = require('path');
const fs = require('fs');
const marked = require('marked');
// const fetch = require('node-fetch');

const rutAbsoluta = (ruta) => path.isAbsolute(ruta); // retorna una ruta absoluta
const rutRelativa = (ruta) => path.resolve(ruta); // retorna una ruta absoluta de una ruta relativa
// console.log(rutAbsoluta('README.md'));
const archiboMd = (ruta) => path.extname(ruta) === '.md'; // retorna archivos .md
const contenidoDirectorio = (ruta) => fs.readdirSync(ruta); // retorna contenido del directorio
const leeContenidoArchivoMd = (ruta) => (fs.readFileSync(ruta, 'utf-8')).trim(); // lee el contenido de un archivo
// console.log(xx'/home/yasmit/LIM011-fe-md-links/prueb/prueba2/ReadmePrueba.md'));


const rutArchivo = (ruta) => {
  const estadoArchivo = fs.statSync(ruta);
  return estadoArchivo.isFile();
};

const rutDirectorio = (ruta) => {
  const estadoCarpeta = fs.statSync(ruta);
  return estadoCarpeta.isDirectory();
};

const funcionRecursión = (ruta) => {
  let newArray = [];
  if (archiboMd(ruta) === true && rutArchivo(ruta) === true) {
    newArray.push(ruta);
    leeContenidoArchivoMd(ruta);
  }
  if (rutDirectorio(ruta) === true) {
    const listaContenido = contenidoDirectorio(ruta);
    listaContenido.forEach((Element) => {
      const rutaAbsoluta = path.join(ruta, Element);
      newArray = newArray.concat(funcionRecursión(rutaAbsoluta));
    });
  }
  return newArray;
};// retorna un arra de archivos .md
// console.log(funcionRecursión('/home/yasmit/LIM011-fe-md-links/prueb'));
const markdownLinkExtractor = (ruta) => {
  let links = [];

  const renderer = new marked.Renderer();
  const contenidoArch = leeContenidoArchivoMd(ruta);
  renderer.link = (href, file, text) => {
    links = links.concat([{ href, path: ruta, text }]);
  };

  marked(contenidoArch, { renderer });

  return links;
};

// console.log(markdownLinkExtractor('/home/yasmit/LIM011-fe-md-links/README.md'));

const obtenerLinks = (ruta) => {
  let newArrayArr = [];
  const arraArchivosMd = funcionRecursión(ruta);
  arraArchivosMd.forEach((Element) => {
    newArrayArr = newArrayArr.concat(markdownLinkExtractor(Element));
  });
  return newArrayArr;
};
// console.log(obtenerLinks('/home/yasmit/LIM011-fe-md-links/prueb'));


module.exports = {
  rutAbsoluta,
  rutRelativa,
  rutArchivo,
  rutDirectorio,
  archiboMd,
  funcionRecursión,
  contenidoDirectorio,
  leeContenidoArchivoMd,
  obtenerLinks,
  // funcionValidar,

};
