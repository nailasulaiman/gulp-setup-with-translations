var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv,
    gulpIf = require('gulp-if'),
    chalk = require('chalk'), // format console logs
    // LIVERELOAD -  need extension for Chrome: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
    livereload = require('gulp-livereload');


    // -------------------------
    // JAVASCRIPT
    // -------------------------

    var scripts = {
        main: [
            'src/scripts/**/*.js'
        ],
        vendor: [
            'src/bower_components/jquery/dist/jquery.min.js'
        ]
    }

    // lint main js files
    gulp.task('jshint', function() {
        return gulp.src('scripts.main')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });

    // minify main js files

    gulp.task('scripts:main', function() {
        return gulp.src(scripts.main)
            .pipe(sourcemaps.init())
            .pipe(concat('scripts.min.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('.public/js'))
            .pipe(rename('scripts.min.js'))
            .pipe(uglify({mangle:true})
            .on('error', function(e) {
                console.log( chalk.red(e.message) );
                return this.end();
            }))
            .pipe(gulpIf(argv.build, gulp.dest('dist/js'))) // prod
            .pipe(livereload());
    });


    // copy vendor js files
    gulp.task('scripts:vendor', function() {
        return gulp.src(scripts.vendor)
            .pipe(gulpIf(argv.build, gulp.dest('dist/js/vendor'))) // prod
            .pipe(gulpIf(argv.watch, gulp.dest('.public/js/vendor'))) // dev
    });
