var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var webpack = require('webpack-stream');

/* Watch Files For Changes */
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('js/**/*.js', ['webpack']);
});

/* Webpack */
gulp.task('webpack', function (callback) {
  return gulp.src('js/*.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('staticfiles/webpack_bundles/'))
    .pipe(livereload());
});

gulp.task('default', ['watch', 'webpack']);
