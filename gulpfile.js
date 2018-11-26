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

function js() {
    gulp.src(['client/js/*.js', '!client/js/*.min.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/js'));

    return gulp.src('client/js/*.min.js')
        .pipe(gulp.dest('public/js'));
}

function css() {
    return gulp.src('client/css/*.css')
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'));
}

function image() {
    var path_ = 'client/assets/images/*.';
    return gulp.src([path_ + 'jpg', path_ + 'png', path_ + 'svg', path_ + 'ico', path_ + 'jpeg'])
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'));
}

function font() {
    var path_ = 'client/assets/fonts/*.';
    gulp.src(path_ + 'css')
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/fonts'));
    
    gulp.src(['client/assets/fonts/*', '!' + path_ + 'css', '!' + path_ + 'svg'])
        .pipe(gulp.dest('public/fonts'));
     
    return gulp.src(path_ + 'svg')
        .pipe(imagemin())
        .pipe(gulp.dest('public/fonts'));
        
}

gulp.task('render', render);
gulp.task('image', image);
gulp.task('font', font);
gulp.task('css', css);
gulp.task('js', js);

gulp.task('default', function(cb) { font(); image(); js(); css(); render(cb); });
