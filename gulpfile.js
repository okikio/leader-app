var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-csso');
var imagemin = require('gulp-imagemin');

function render(cb) {
    return gulp.src('data/render.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('data'));
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
    var path_ = 'client/images/*.';
    var list = [path_ + 'jpg', path_ + 'png', path_ + 'svg', path_ + 'ico', path_ + 'jpeg'];
    gulp.src(list)
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'));
        
    path_ = "client/images/logo/*.";
    list = [path_ + 'jpg', path_ + 'png', path_ + 'svg', path_ + 'ico', path_ + 'jpeg'];
    return gulp.src(list)
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/logo'))
}

function font() {
    var path_ = 'client/fonts/*.';
    gulp.src(path_ + 'css')
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/fonts'));
    
    gulp.src(['client/fonts/*', '!' + path_ + 'css', '!' + path_ + 'svg'])
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
