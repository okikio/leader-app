var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-csso');
var imagemin = require('gulp-imagemin');

function render(cb) {
    return gulp.src('render.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'));
}

function js () {
  gulp.src(['client/js/*.js', '!client/js/*.min.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'));
    
  return gulp.src('client/js/*.min.js')
    .pipe(gulp.dest('public/js'));
}

function css () {
  return gulp.src('client/css/*.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
}

function image () {
  return gulp.src('client/css/*.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
}

gulp.task('render', render);
gulp.task('image', image);
gulp.task('css', css);
gulp.task('js', js);

gulp.task('default', function(cb) { image(); js(); css(); render(cb); });