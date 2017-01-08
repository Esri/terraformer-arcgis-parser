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
          stats:    stats
        };
        return resolve(fileData);
      });
    });
  });
}

function readFile(file) {
  const buffLen = file.stats.size;
  const chunkSize = file.stats.size < 1024 ? file.stats.size
                                           : 1024;
  let buff = Buffer.alloc(buffLen);
  return tryRead(file.fd, buff, 0, chunkSize)
  .then((fileData) => {
    fileData.fileName = file.fileName;
    return fileData;
  });
}

// Doing this in a while loop will err on Windows (but works on OS X), as Node 
// will continue to increment the loop counters while items are being read,
// resulting in a malformed JSON object.
function tryRead(fd, buff, offset, length) {
  return new Promise((resolve, reject) => {
    fs.read(fd, buff, offset, length, null,
            (err, bytesRead, buffer) => {
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

let operation = process.argv[2];
if (!operation) operation = 'convert';

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
      if (arcGIS.rings || arcGIS.paths) {
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
      console.log('Results written to ' + output.fileName);
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

const fileName = process.argv[3];
if (!fileName) return console.log('Please specify a file to read from.');

// Kickoff
openFile(fileName)
.then(file => { return readFile(file); })
.then(fileData => { return convertFile(fileData); })
.then(output => { return writeFile(output); })
.then(fd => { return closeFile(fd); })
.catch(err => { console.log('in catch'); return console.log(err); });
