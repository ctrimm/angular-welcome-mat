// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inlineCss = require('gulp-inline-css');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('./src/lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
return gulp.src('./src/*.scss')
  .pipe(sass())
  .pipe(rename('styles.css'))
  .pipe(gulp.dest('./'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('./src/lib/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('./src/lib/*.js', ['lint', 'scripts']);
  gulp.watch('./src/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts']);

// Gulp all
gulp.task('all', ['default']);
