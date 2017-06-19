var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    argv = require('yargs').argv,
    gulpIf = require('gulp-if'),
    chalk = require('chalk'), // format console logs
    livereload = require('gulp-livereload');


// -------------------------
// SASS
// -------------------------

// compile sass into css and minify - place into .public folder

gulp.task('sass', function() {
    var processors = [
        autoprefixer({
            browsers: ['last 3 version', 'safari 5', 'ie 9']
        }),
        cssnano
    ];
    return gulp.src('src/styles/**.scss')
        .pipe(sass({
                outputStyle: 'expanded'
            })
            .on('error', function(e) {
                console.log( chalk.red(e.message) );
                return this.end();
            })
        )
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulpIf(argv.build, gulp.dest('dist/css'))) // prod
        .pipe(gulpIf(argv.watch, gulp.dest('.public/css'))) // dev
        .pipe(livereload());
});
