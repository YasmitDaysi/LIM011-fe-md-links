const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');

const rutAbsoluta = (ruta) => path.isAbsolute(ruta);
const rutRelativa = (ruta) => path.resolve(ruta);
const archiboMd = (ruta) => path.extname(ruta) === '.md';
const contenidoDirectorio = (ruta) => fs.readdirSync(ruta);
const leeContenidoArchivoMd = (ruta) => (fs.readFileSync(ruta, 'utf-8')).trim();

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
};

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

const obtenerLinks = (ruta) => {
  let newArrayArr = [];
  const arraArchivosMd = funcionRecursión(ruta);
  arraArchivosMd.forEach((Element) => {
    newArrayArr = newArrayArr.concat(markdownLinkExtractor(Element));
  });
  return newArrayArr;
};

const funcionValidar = (ruta) => {
  const guardarP = [];
  obtenerLinks(ruta).forEach((Element) => {
    const obj = { ...Element };

    guardarP.push(fetch(Element.href)
      .then((Response) => {
        if ((Response.status >= 200) && (Response.status <= 399)) {
          obj.status = Response.status;
          obj.message = 'OK';
          return obj;
        }
        obj.status = Response.status;
        obj.message = 'FAIL';
        return obj;
      }).catch(() => ({
        status: 'no existe',
        mensaje: 'fail',
      })));
  });
  return Promise.all(guardarP);
};
funcionValidar('/home/yasmit/LIM011-fe-md-links/prueb').then((Response) => console.log(Response));

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
  funcionValidar,
};
