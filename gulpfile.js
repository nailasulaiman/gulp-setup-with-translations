// TODO: add precommit hooks for build task
// livereload on translation change
// open chrome on watch task

var gulp = require('gulp'),
    requireDir = require('require-dir'),
    dir = requireDir('./gulp');

var del = require('del'),
    ip = require('ip'), // print IP address
    argv = require('yargs').argv,
    gulpIf = require('gulp-if'),
    chalk = require('chalk'), // format console logs
    runSequence = require('run-sequence'),
    livereload = require('gulp-livereload'); // LIVERELOAD -  need extension for Chrome: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en


// ENVIRONMENTS
var dev = argv.watch,
    prod = argv.build;


// -------------------------
// EXPRESS SERVER
// places compiled files into hidden .public folder. Compiles on task 'gulp --watch'
// -------------------------

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(express.static(__dirname + '/.public', {
        'extensions': ['html']
    }));
    app.listen(4000);
});



// -------------------------
// CLEAN
// -------------------------

// remove all dist files before compiling for production
gulp.task('clean', function(done) {
    if (dev) { del(['.public'], done); }
    if (prod) { del(['dist'], done); }
});


// -------------------------
// MAIN TASKS
// -------------------------

// watch directories / files and livereload when changes are made
gulp.task('watch', function() {
    livereload.listen({
        quiet: true
    });
    gulp.watch(['src/styles/**'], ['sass']);
    gulp.watch(['src/scripts/*.js'], ['jshint', 'scripts:main']);
    gulp.watch(['src/markup/**/*.html'], ['markup']);
    gulp.watch(['src/locales/**/*.json'], ['markup']);
    gulp.watch(['src/markup/**/*.html','src/locales/**/*.json'], ['mainIndex:dev']);
    gulp.watch(['src/images/**'], ['images']);
    gulp.watch(['src/fonts/**'], ['fonts']);
});


gulp.task('default', function(callback) {
    // Dev gulp task -- runs express server for development and serves from hidden .public folder
    if (dev) {
        runSequence('clean',
          ['express', 'watch', 'sass', 'scripts:main', 'scripts:vendor', 'images', 'fonts', 'markup'],
          'mainIndex:dev',
          callback
        )
        console.log(chalk.yellow('----------------------------------------'));
        console.log(chalk.bold.green('  Local: http://localhost:4000')); // will livereload
        console.log(chalk.bold.green('  External: http://' + ip.address() + ':4000')); // will not livereload
        console.log(chalk.yellow('----------------------------------------'));
        console.log(chalk.yellow('gulp is watching and will rebuild when changes are made...'));
    }
    // Build gulp task -- make files ready for production and moves to dist folder
    else if (prod) {
        runSequence('clean',
          ['sass', 'scripts:main', 'scripts:vendor', 'images', 'fonts', 'markup'],
          'mainIndex:prod',
          callback
        )
        console.log(chalk.yellow('Your build files are ready for production'));
    }
});
