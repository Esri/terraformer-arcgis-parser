'use strict';
const fs = require('fs');
let ArcGIS;
try { ArcGIS = require('./terraformer-arcgis-parser.js'); }
catch (err) {
  const message = 'Could not load Terraformer - please make sure '
                  + 'to run \'npm install\' before running.'
  return console.log(message, err);
}

function openFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.open(fileName, 'r+', (err, fd) => {
      if (err) return reject(err);
      fs.fstat(fd, (err, stats) => {
        if (err) return reject(err);
        const fileData = {
          fd:       fd,
          fileName: fileName,
          size:     stats.size
        };
        return resolve(fileData);
      });
    });
  });
}

function readFile(file) {
  const buffLen = file.size;
  const chunkSize = buffLen < 1024 ? buffLen
                                   : 1024;
  let buff = Buffer.alloc(buffLen);
  return tryRead(file.fd, buff, 0, chunkSize)
  .then((fileData) => {
    fileData.fileName = file.fileName;
    return fileData;
  });
}

function tryRead(fd, buff, offset, length) {
  return new Promise((resolve, reject) => {
    fs.read(fd, buff, offset, length, null, (err, bytesRead, buffer) => {
      if (err) return reject(err);
      const buffLen = buffer.length;
      offset += bytesRead;
      if (offset >= buffLen) return resolve(buff);
      if ((offset + length) >= buffLen) length = buffLen - offset;
      return resolve();
    });
  })
  .then(
    (fullBuffer) => {
      return fullBuffer ? { data: fullBuffer, fd: fd }
                        : tryRead(fd, buff, offset, length);
    },
    (err) => { throw err; }
  );
}

function convertFile(fileData) {
  const buffString = fileData.data.toString();
  const toConvert = JSON.parse(buffString);
    
  let converted = [], newFileData = {};
  if (operation === 'convert') {
    converted = ArcGIS.convert(toConvert);
    newFileData = converted;
  } else if (operation === 'parse') {
    newFileData.collectionType = 'FeatureCollection';
    let convertedItem;
    toConvert.forEach(arcGIS => {
      if (arcGIS.rings ||
          arcGIS.paths ||
          arcGIS.points ||
          (arcGIS.x && arcGIS.y)) {
        newFileData.collectionType = 'GeometryCollection';
      }
      convertedItem = ArcGIS.parse(arcGIS);
      converted.push(convertedItem);
    });
    if (newFileData.collectionType === 'GeometryCollection') {
      newFileData.geometries = converted;
    } else {
      newFileData.features = converted;
    }
  }

  let fileNameSplit = fileData.fileName.split('.');
  let fileNameWithoutExtension = fileNameSplit[fileNameSplit.length - 2];
  fileNameSplit = fileNameWithoutExtension.split('/');
  fileNameWithoutExtension = fileNameSplit[fileNameSplit.length - 1];

  let outputExtension = '.geojson';
  if (operation === 'convert') outputExtension = '.arcjson';
  const outputFileName = fileNameWithoutExtension + outputExtension;
  const output = {
    data:     JSON.stringify(newFileData, null, 2),
    fd:       fileData.fd,
    fileName: outputFileName
  };
  return output;
}

function writeFile(output) {
  return new Promise((resolve, reject) => {
    fs.writeFile(output.fileName,
                 output.data,
                 (err) => {
                   if (err) return reject(err);
                   return resolve();
                 });
  })
  .then(
    () => {
      console.log('Result written to ' + output.fileName);
      return output.fd;
    },
    (err) => { throw err; }
  );
}

function closeFile(fd) {
  return new Promise((resolve, reject) => {
    fs.close(fd, (err) => {
      if (err) return reject(err);
      console.log(fileName + ' closed.');
      return resolve();
    });
  });
}

let operation = process.argv[2];
if (!operation) operation = 'convert';

const fileName = process.argv[3];
if (!fileName) {
  console.log('Please specify a file to ' + operation + '.');
  return;
}

// Kickoff
openFile(fileName)
.then(file => { return readFile(file); })
.then(fileData => { return convertFile(fileData); })
.then(output => { return writeFile(output); })
.then(fd => { return closeFile(fd); })
.catch(err => { return console.log(err); });
