const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const klaw = require('klaw');
var through2 = require('through2');
var Jimp = require("jimp");
var util = require('util');
var path = require('path');

var excludeDirFilter = through2.obj(function (item, enc, next) {
  if (!item.stats.isDirectory()) this.push(item)
  next()
})

klaw('src/assets/img')
  .pipe(excludeDirFilter)
  .on('data', function (file) {
    Jimp.read(file.path).then(function (image) {
      console.log(path.basename(file.path).split('.')); 
      // item.resize(256, 256) 
      //   .write(); 
    });
  });

imagemin(['src/public/img/*.{jpg,png}'], 'dist/public/img', {
  plugins: [
    imageminMozjpeg(),
    imageminPngquant({quality: '65-80'})
  ]
})
