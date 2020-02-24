const path = require('path');
const fs = require('fs');
const marked = require('marked');

const absolutePath = (route) => path.isAbsolute(route);
const getAbsolutePath = (route) => path.resolve(route);
const isMD = (route) => path.extname(route) === '.md';
const readDirectory = (route) => fs.readdirSync(route);
const readFile = (route) => (fs.readFileSync(route, 'utf-8')).trim();
const isFile = (route) => fs.statSync(route).isFile();
const isDirectory = (route) => fs.statSync(route).isDirectory();

const saveRoutesOfFiles = (route) => {
  let allFiles = [];
  if (isFile(route) && isMD(route)) {
    allFiles.push(route);
  }
  if (isDirectory(route)) {
    const getDirectoryContent = readDirectory(route);
    getDirectoryContent.forEach((Element) => {
      const rutaAbsoluta = path.join(route, Element);
      allFiles = allFiles.concat(saveRoutesOfFiles(rutaAbsoluta));
    });
  }
  return allFiles;
};

const markdownLinkExtractor = (route) => {
  let links = [];
  const renderer = new marked.Renderer();
  const fileContent = readFile(route);
  renderer.link = (href, file, text) => {
    links = links.concat([{ href, path: route, text }]);
  };

  marked(fileContent, { renderer });

  return links;
};


const getAllLinks = (ruta) => {
  let allLinks = [];
  const filePaths = saveRoutesOfFiles(ruta);
  filePaths.forEach((Element) => {
    allLinks = allLinks.concat(markdownLinkExtractor(Element));
  });
  return allLinks;
};

module.exports = {
  absolutePath,
  getAbsolutePath,
  isFile,
  isDirectory,
  isMD,
  saveRoutesOfFiles,
  readDirectory,
  readFile,
  getAllLinks,

};
