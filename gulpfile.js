var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-csso');
var imagemin = require('gulp-imagemin');

function js () {
  gulp.src(['client/js/*.js', '!client/js/*.min.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'));
    
  gulp.src('client/js/*.min.js')
    .pipe(gulp.dest('public/js'));
}

function css () {
  gulp.src('client/css/*.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
}

function image () {
  gulp.src('client/css/*.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
}

gulp.task('image', image);
gulp.task('css', css);
gulp.task('js', js);

gulp.task('default', function() { image(); js(); css(); });