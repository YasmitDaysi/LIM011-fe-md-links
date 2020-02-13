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
// console.log(contenidoDirectorio('/home/yasmit/LIM011-fe-md-links/prueb'));


const rutArchivo = (ruta) => {
  const estadoArchivo = fs.statSync(ruta);
  return estadoArchivo.isFile();
}; // retorna true si es un archivo

const rutDirectorio = (ruta) => {
  const estadoCarpeta = fs.statSync(ruta);
  return estadoCarpeta.isDirectory();
};// retorna true si es un directorio
// console.log(contenidoDirectorio('/home/yasmit/LIM011-fe-md-links'));

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
      // console.log(ruta, Element);
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


// const funcionValidar = (ruta) => {
//   const guardarP = [];
//   obtenerLinks(ruta).forEach((Element) => {
//     const obj = { ...Element };

//     guardarP.push(fetch(Element.href)
//       .then((Response) => {
//         if ((Response.status >= 200) && (Response.status <= 399)) {
//           obj.status = Response.status;
//           obj.message = 'OK';
//           // console.log('principio', Element);
//           return obj;
//         }
//         obj.status = Response.status;
//         obj.message = 'FAIL';
//         // console.log('finallll', obj);

//         return obj;
//       }).catch(() => ({
//         status: 'no existe',
//         mensaje: 'fail',
//       })));
//   });
//   return Promise.all(guardarP);
// };
// funcionValidar('/home/yasmit/LIM011-fe-md-links/prueb').then((Response) =>
// console.log(Response));

// const mdLinks = (ruta, options) => {
//   if (rutAbsoluta(ruta)) {
//     if (options === true) {
//       return funcionValidar(ruta);
//     }
//     return Promise.resolve(obtenerLinks(ruta));
//     // Promise.resolve(obtenerLinks(ruta)).then((value) => value);
//   }
//   const nuevoRuta = rutRelativa(ruta);
//   return mdLinks(nuevoRuta, options);
// };
// mdLinks('/home/yasmit/LIM011-fe-md-links/prueb', true).then((Response) => console.log(Response));
// console.log(mdLinks('/home/yasmit/LIM011-fe-md-links/prueb', false));


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

};
