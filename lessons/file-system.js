const fs = require('fs');
const path = require('path');

// Создание и удаление папки с блокированием главного потока
fs.mkdirSync(path.resolve(__dirname, 'sync-dir-from-nodejs'));
console.log('directory created!');
fs.rmdirSync(path.resolve(__dirname, 'sync-dir-from-nodejs'));
console.log('directory deleted!');

// Создание и удаление вложенных папок с блокированием главного потока
fs.mkdirSync(path.resolve(__dirname, 'first-dir', 'second-dir', 'third-dir'), { recursive: true });
console.log('directories created!');
fs.rmSync(path.resolve(__dirname, 'first-dir'), {
  recursive: true,

});
console.log('directories deleted!');

// ========================================================================
// Асинхронное Создание и удаление папки с без блокированя главного потока

// create
fs.mkdir(path.resolve(__dirname, 'dir-one'), (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('directory created asynchronously!');
}, { recursive: true });

// remove
fs.rmdir(path.resolve(__dirname, 'dir-one'), (err) => {
  if (err) {
    throw err;
  }
  console.log('directories removed asynchronously!');
});

// Запись в файл (перезапись файла)
fs.writeFile(path.resolve(__dirname, 'test.txt'), `some test data
to write into 
text.txt
`, (err) => {
  if (err) {
    throw err;
  }
  console.log('file successfully written out and created');
});

// Запись в файл (добавление в файл текста)
fs.appendFile(path.resolve(__dirname, 'test.txt'), `added data to the end of the file!
`, (err) => {
  if (err) {
    throw err;
  }
  console.log('data successfully appended to the file!');
});

// В данный момент в коде выше, по добавлению файлов и записи в них существует проблема,
//  из-за того, что операции асинхронные, выполняются не последовательно
// Для избежания такой проблемы используем промисы

const writeFileAsync = async (thePath, textToWrite) => new Promise(
  (resolve, reject) => {
    fs.writeFile(
      thePath,
      textToWrite,
      (err) => {
        if (err) {
          return reject(err.message);
        }
        return resolve('successfully written!');
      },
    );
  },
);

const appendFileAsync = async (thePath, textToWrite) => new Promise((resolve, reject) => {
  fs.appendFile(
    thePath,
    textToWrite,
    (err) => {
      if (err) {
        return reject(err.message);
      }
      console.log('successfully added!');
      return resolve();
    },
  );
});

const readFileAsync = async (thePath) => new Promise((resolve, reject) => {
  fs.readFile(
    thePath,
    { encoding: 'utf-8' },
    (err, data) => {
      if (err) {
        return reject(err.message);
      }
      console.log('successfully read!');
      return resolve(data);
    },
  );
});

const removeFileAsync = async (thePath) => new Promise((resolve, reject) => {
  fs.rm(
    thePath,
    (err) => {
      if (err) {
        return reject(err.message);
      }
      console.log('successfully deleted!');
      return resolve();
    },
  );
});

// it can be implemented vie promises api (then, catch)
(async () => {
  const currPath = path.resolve(__dirname, 'text-async.txt');

  await writeFileAsync(currPath, 'lmao');
  await appendFileAsync(currPath, 'sometext2');
  await appendFileAsync(currPath, 'sometext3');
  await appendFileAsync(currPath, 'sometext4');
  await appendFileAsync(currPath, 'sometext5');
  const dataStr = await readFileAsync(currPath);
  console.log(dataStr);
  await removeFileAsync(currPath);
})();

const text = process.env.TEXT || '';
const internalPath = path.resolve(__dirname, 'text.txt');
const extendedPath = path.resolve(__dirname, 'count.txt');

writeFileAsync(internalPath, text)
  .then(() => readFileAsync(internalPath))
  .then((data) => {
    console.log(data.length);
    return data.length;
  })
  .then((dataLength) => {
    writeFileAsync(extendedPath, `${dataLength}`);
  });
