var gulp = require('gulp'),
    argv = require('yargs').argv,
    gulpIf = require('gulp-if');


// -------------------------
// COPY FONTS
// -------------------------

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
    .pipe(gulpIf(argv.build, gulp.dest('dist/fonts'))) // prod
.pipe(gulpIf(argv.watch, gulp.dest('.public/fonts'))) // dev
})
