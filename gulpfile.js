/* jshint node: true */
'use strict';

var gulp = require('gulp');

var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
  webroot: './'
};
paths.css = paths.webroot + 'css/**/*.css';
paths.js = paths.webroot + 'js/**/*.js';

// watch files for changes and reload.
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: paths.webroot
    }
  });

  gulp.watch(['*.html', paths.css, 'build/js/main.js'], {cwd: paths.webroot}, reload);
});


// The gulp-browserify package isn't great, next time just use browserify.
gulp.task('scripts', function() {
  function  build() {
    gulp.src('js/main.js')
      .pipe(browserify({
        insertGlobals : true
      }))
      .pipe(gulp.dest('build/js'));
  }
  build();
  gulp.watch(['*.html', paths.css, paths.js], build);
});

gulp.task('default', ['scripts','serve']);