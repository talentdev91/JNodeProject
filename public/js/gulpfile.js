'use strict';

const browserify = require('browserify');
const gulp       = require('gulp');
const reactify   = require('reactify');
const source     = require('vinyl-source-stream');

gulp.task('browserify', function(){
  let b = browserify();
  b.transform(reactify);
  b.add('./components/main.jsx');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./src'));
});

gulp.task('watch', function () {
	gulp.watch('components/**/*.jsx', ['browserify'])
});

gulp.task('default', ['watch']);
