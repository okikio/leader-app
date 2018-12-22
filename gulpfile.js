var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-csso');
var imageop = require('gulp-imagemin');
var fontGen = require('gulp-fontgen');
var concat = require('gulp-concat-css');
var colors = require("colors");

function render(done) {
    return gulp.src('data/render.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('data')),
        console.log("Finished ... Render".red), done();
}

function js(done) {
    return gulp.src(['client/js/*.js', '!client/js/*.min.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/js')),

        gulp.src('client/js/*.min.js')
        .pipe(gulp.dest('public/js')),
        console.log("Finished ... JS".red), done();
}

function css(done) {
    return gulp.src('client/css/*.css')
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css')),
        console.log("Finished ... CSS".red), done();
}

function image(done) {
    return gulp.src('client/images/*')
        .pipe(imageop())
        .pipe(gulp.dest('public/images')),
        console.log("Finished ... Image".red), done();
}

function fontgen(done) {
    return gulp.src("client/fonts/*.{ttf,otf}")
        .pipe(fontGen({
            dest: "client/fonts/"
        }))

        .pipe(fontGen({
            dest: "public/fonts/"
        })),
        done();
}

function font(done) {
    return gulp.src(['client/fonts/*.css', '!client/fonts/fonts.css'])
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/fonts')),
        
        gulp.src('client/fonts/*.css')
        .pipe(concat('fonts.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/fonts')),
        console.log("Finished ... Font".red),
        done();
}

gulp.task('fontgen', fontgen);
gulp.task('render', render);
gulp.task('image', image);
gulp.task('font', font);
gulp.task('css', css);
gulp.task('js', js);

gulp.task('default', function(done) {
    return image(), js(), css(), render(), font(), done();
});
