var gulp = require('gulp')
var sass = require('gulp-sass')
var cssnano = require('gulp-cssnano')
var rename = require('gulp-rename')
var webpack = require('webpack-stream')

/* Compile Our Sass */
gulp.task('sass', function() {
  return gulp
    .src('sass/main.scss')
    .pipe(
      sass({
        includePaths: ['node_modules/'],
      })
    )
    .pipe(gulp.dest('staticfiles/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('staticfiles/css'))
})

/* Webpack */
gulp.task('webpack', function() {
  return gulp
    .src('js/*.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('staticfiles/webpack_bundles/'))
})

gulp.task('build', gulp.parallel('sass', 'webpack'))

/* Watch Files For Changes */
gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', gulp.series('sass'))
  gulp.watch('js/**/*.js', gulp.series('webpack'))
})

gulp.task('default', gulp.series('build', 'watch'))
