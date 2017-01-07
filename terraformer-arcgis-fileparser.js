'use strict';
const fs = require('fs');

let operation = process.argv[2];
if (!operation) operation = 'convert';

let ArcGIS;
try { ArcGIS = require('./terraformer-arcgis-parser.js'); } 
catch (err) {
  const message = 'Could not load Terraformer - please make sure '
                  + 'to run \'npm install\' before attempting to '
                  + operation + ' file.'
  return console.log(message, err);
}

const fileName = process.argv[3];
if (!fileName) return console.log('Please specify a file to read from.');

const now = Date.now();

fs.open(fileName, 'r+', (err, fd) => {
	if (err) {
		return console.log('Error opening: ' + fileName, err);
	}

    // nodeReadFile();

	fs.fstat(fd, (err, stats) => {
		if (err) return console.log(err);

    const chunkSize = 1024;
    const buffLen = stats.size;
    let buff = Buffer.alloc(buffLen);
    tryRead(fd, buff, 0, chunkSize, buffLen);
	});
});


function nodeReadFile() {
  fs.readFile(fileName, null, (err, data) => {
    if (err) {
      return console.log('Error reading from file: ' + filename, err);
    }
    writeOutput(data);
  });
}

// Doing this in a while loop will err on Windows (but works on OS X), as Node 
// will continue to increment the loop counters while items are being read,
// resulting in a malformed JSON object.
function tryRead(fd, buff, offset, length) {
  fs.read(fd, buff, offset, length, null,
          (err, bytesRead, buffer) => {
            if (err) return console.log('Error while reading file:', err);
            const buffLen = buffer.length;
            offset += bytesRead;
            if (offset >= buffLen) return writeOutput(buff);
            if ((offset + length) > buffLen) length = buffLen - offset;
            return tryRead(fd, buff, offset, length);
          });
}

const operationMap = {
	'convert': ArcGIS.convert,
	'parse':   ArcGIS.parse
};
function writeOutput(data) {
  const buffString = data.toString();

  let toConvert;
  try { toConvert = JSON.parse(buffString); }
  catch (err) { return console.log('Error parsing file data.', err); }
  
  let converted;
  try { converted = operationMap[operation](toConvert); } 
  catch (err) { return console.log('Error parsing file: ' + filename, err); }

  /**
   * Account for filename being a relative path, e.g.
   * ../../some/file.geojson
   */
  let fileNameSplit = fileName.split('.');
  let fileNameWithoutExtension = fileNameSplit[fileNameSplit.length - 2];
  fileNameSplit = fileNameWithoutExtension.split('/');
  fileNameWithoutExtension = fileNameSplit[fileNameSplit.length - 1];

  const outputFileName = fileNameWithoutExtension + '.json';
  const output = {
    type: "FeatureCollection",
    features: converted
  };

  fs.writeFile(outputFileName, JSON.stringify(output, null, 2), (err) => {
    if (err) {
        return console.log('Error writing to file: ' + outputFileName, err);
    }
    const tDelta = Date.now() - now;
    console.log('Took ' + tDelta + ' ms to convert.');
    console.log('Results written to ' + outputFileName);
    return;
  });
}
