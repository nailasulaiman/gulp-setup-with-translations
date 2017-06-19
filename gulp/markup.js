var gulp = require('gulp'),
    argv = require('yargs').argv,
    gulpIf = require('gulp-if'),
    i18n = require('gulp-i18n-localize'), // translations: https://github.com/filaraujo/gulp-i18n-localize //https://cnpmjs.org/package/gulp-html-i18n
    merge = require('merge-stream'),
    chalk = require('chalk'), // format console logs
    assetpaths = require('gulp-assetpaths'),
    livereload = require('gulp-livereload');

gulp.task('markup', function () {
    return gulp.src('src/markup/**/*.html')
        .pipe(i18n({
            locales: [
                'chinese',
                'english',
                'french'
            ],
            localeDir: 'src/locales',
            delimeters: ['!{', '}!']
        })
        .on('error', function(e) {
            console.log( chalk.red(e.message) );
            return this.end();
        }))
        .pipe(gulpIf(argv.build, gulp.dest('dist'))) // prod
        .pipe(gulpIf(argv.watch, gulp.dest('.public'))) // dev
        .pipe(livereload());
});


// COPYING ENGLISH INDEX FILE TO MAIN ROOT AND CHANGING ASSET PATHS
gulp.task('mainIndex:dev', ['markup'] ,function () {
    return gulp.src('.public/english/index.html')
        // take file and change paths for the main folder index.html
        .pipe(assetpaths({
          newDomain: './',
          oldDomain : '../',
          docRoot : 'public_html',
          filetypes : ['jpg','jpeg','png','ico','gif','js','css', 'html'],
          templates: true
         }))
        .pipe(gulp.dest('.public/'))
});


gulp.task('mainIndex:prod', ['markup'] ,function () {
    return gulp.src('dist/english/index.html')
        // take file and change paths for the main folder index.html
        .pipe(assetpaths({
          newDomain: './',
          oldDomain : '../',
          docRoot : 'public_html',
          filetypes : ['jpg','jpeg','png','ico','gif','js','css', 'html'],
          templates: true
         }))
        .pipe(gulp.dest('dist/'))
    });
