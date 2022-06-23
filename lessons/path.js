const path = require('path');
//  Склейка участков пути
console.log('glue path', path.join(__dirname, '..')); // absolute path to directory where current file located
const fullPath = path.resolve(__dirname, 'first', 'second', 'third.js');
console.log(fullPath);

// Парсинг пути
console.log('\n Парсинг пути');
console.log(path.parse(fullPath));
// Разделитель в ОС
console.log('\n Разделитель для пути в ОС');
console.log(path.sep);
// Проверка на абсолютный путь
console.log('\n Проверка на абсолютный путь');
console.log(path.isAbsolute('first/second'));
console.log(path.isAbsolute(__dirname));
console.log(path.isAbsolute(path.join(__dirname, '..', 'somepath')));
// Название файла
console.log(path.basename(__dirname));
console.log(path.basename(path.join(__dirname, 'path.js')));

// Расширение файла
const dirExt = path.extname(__dirname);
console.log(dirExt.length);
console.log(path.extname(__dirname));
console.log(path.extname(path.join(__dirname, 'path.js')));

// ----------------------------------------
// URL парсинг
const siteUrl = 'https://www.youtube.com/watch?v=243pQXC5Ebs';
const url = new URL(siteUrl);
console.log(url);
