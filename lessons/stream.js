// Readable
// Writable
// Duplex
// Transform

const fs = require('fs');
const path = require('path');

const pathToLargeFile = path.resolve(__dirname, 'large-size-file.txt');

const fileInnerData = fs.readFileSync(pathToLargeFile);
// const fileInnerData = fs.readFileSync(pathToLargeFile, {encoding: 'utf-8'});
console.log(fileInnerData);

const readStream = fs.createReadStream(pathToLargeFile);

// Один чанк по дефолту 64кб
readStream.on('data', (chunk) => {
  console.log(chunk);
});
readStream.on('resume', () => {
  console.log('resumed');
});

readStream.on('close', () => {
  console.log('closed');
});
readStream.on('end', () => {
  console.log('ended');
});
