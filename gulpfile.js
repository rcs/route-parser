/* eslint-disable no-console */

'use strict';

var gulp = require('gulp');
var childProcess = require('child_process');
var eslint = require('gulp-eslint');

var realCodePaths = [
  '**/*.{js,jsx,coffee}',
  '!node_modules/**',
  '!lib/route/compiled-grammar.js',
  '!coverage/**',
  '!docs/**'
];

gulp.task('lint', function () {
  gulp.src(realCodePaths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('jsdoc', function () {
  childProcess.exec(
    './node_modules/.bin/jsdoc -c jsdoc.json',
    function (error, stdout, stderr) {
      console.log(stdout);
      console.error(stderr);
    }
  );
});

gulp.task('default', function () {
  gulp.watch(realCodePaths, ['lint', 'jsdoc']);
});
