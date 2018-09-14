var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  gulp.src('client/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'));
    
  gulp.src(['client/assets/images/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/images'));
    
  gulp.src('client/css/*.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
});