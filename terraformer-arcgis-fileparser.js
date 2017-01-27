'use strict';
/**
 * Copyright 2017 by Graham Freeman Seyffert
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        resolve(fileData);
      });
    });
  });
}

function readFile(file) {
  const buffLen = file.size;
  const chunkSize = buffLen < 1024 ? buffLen
                                   : 1024;
  const buff = Buffer.alloc(buffLen);
  return tryRead(file.fd, buff, 0, chunkSize)
  .then((fileData) => {
    fileData.fileName = file.fileName;
    return fileData;
  });
}

// Reads file by chunkSize at a time.
// Will resolve with the buffer if it's full, otherwise will
// resolve with nothing, indicating another read should happen.
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

function convertFile(fileData, operation) {
  const toConvert = JSON.parse(fileData.data.toString());
  const newFileData = {};
  let outputFileExtension;
  if (operation === 'convert') {
    outputFileExtension = '.json';
    newFileData.features = ArcGIS.convert(toConvert);
  } else if (operation === 'parse') {
    outputFileExtension = '.geojson';
    const firstFeature = toConvert.features[0];
    const isGeoCollection = firstFeature.rings
                          || firstFeature.paths
                          || firstFeature.points
                          || (firstFeature.x && firstFeature.y);
    const converted = toConvert.features.map(feature => ArcGIS.parse(feature));
    if (isGeoCollection) {
      newFileData.type = 'GeometryCollection';
      newFileData.geometries = converted;
    } else {
      newFileData.type = 'FeatureCollection';
      newFileData.features = converted;
    }
  }
  // Considers file paths may be relative or not in CWD
  let fileNameSplit = fileData.fileName.split('.');
  let fileNameWithoutExtension = fileNameSplit[fileNameSplit.length - 2];
  fileNameSplit = fileNameWithoutExtension.split('/');
  fileNameWithoutExtension = fileNameSplit[fileNameSplit.length - 1];
  const outputFileName = fileNameWithoutExtension + outputFileExtension;
  const output = {
    data:     JSON.stringify(newFileData, null, 2),
    fd:       fileData.fd,
    fileName: outputFileName
  };
  return output;
}

let operation = process.argv[2];
if (!operation) operation = 'convert';

const fileName = process.argv[3];
if (!fileName) {
  return console.log('Please specify a file to ' + operation + '.');
}

// Kickoff
openFile(fileName)
.then(file => { return readFile(file); })
.then(fileData => { return convertFile(fileData, operation); })
.then(output => {
  fs.writeFile(output.fileName, output.data, (err) => {
    if (err) return console.log(err);
    fs.close(output.fd, (err) => {
      if (err) console.log(err);
      else console.log('Result written to ' + output.fileName);
    });
  });
 })
.catch(err => { return console.log(err); });
