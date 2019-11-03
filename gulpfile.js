var gulp = require('gulp');
var uglify = require('gulp-terser');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-csso');
// var imageop = require('gulp-imagemin');
// var fontGen = require('gulp-fontgen');
// var concat = require('gulp-concat-css');
var colors = require("colors");
function render(done) {
    return gulp.src('data/render.js')
        .pipe(uglify({
            keep_fnames: false, // change to true here
            toplevel: true,
            compress: {
                // passes: 5,
                dead_code: true,
                pure_getters: true
            },
            ecma: 5
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('data')),
        console.log("Finished ... Render".red), done();
}

function js(done) {
    return gulp.src(['client/**/*.js', '!client/**/*.min.js'])
        .pipe(uglify({
            keep_fnames: false, // change to true here
            toplevel: true,
            compress: {
                passes: 5,
                dead_code: true,
                pure_getters: true
            },
            ecma: 5
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public')),

        gulp.src('client/**/*.min.js')
        .pipe(gulp.dest('public')),
        console.log("Finished ... JS".red), done();
}

function css(done) {
    return gulp.src('client/css/*.css')
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css')),
        console.log("Finished ... CSS".red), done();
}
/*
function image(done) {
    return gulp.src('client/images/ * * / *.{png,svg}') // jpeg,jpg,,svg
        .pipe(imageop())
        .pipe(gulp.dest('client/images')),

        gulp.src('client/images/ * * / * ')
        .pipe(gulp.dest('public/images')),
        console.log("Finished ... Image".red), done();
}

function fontgen(done) {
    /
        sudo apt-get update
        sudo apt-get install add-apt-repository
        sudo apt-get install software-properties-common
        sudo add-apt-repository ppa:fontforge/fontforge
        sudo apt-get update
        sudo apt-get install fontforge

    /
    return gulp.src("./client/fonts/ * * / * .{ttf,otf}")
        .pipe(fontGen({
            dest: "public/fonts/"
        })),
        done();
}

function font(done) {
    return gulp.src(['public/fonts/*.css', '!public/fonts/fonts.min.css'])
        .pipe(concat('fonts.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/fonts')),
        console.log("Finished ... Font".red),
        done();
}
**/
// gulp.task('fontgen', fontgen);
gulp.task('render', render);
// gulp.task('image', image);
// gulp.task('font', font);
gulp.task('css', css);
gulp.task('js', js);

gulp.task('default', function(done) {
    //  image(done), font(done),
    return js(done), css(done), render(done), done();
});
