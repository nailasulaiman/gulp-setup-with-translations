var gulp = require('gulp'),
    argv = require('yargs').argv,
    gulpIf = require('gulp-if');


// -------------------------
// COPY IMAGES
// -------------------------

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(gulpIf(argv.build, gulp.dest('dist/images'))) // prod
        .pipe(gulpIf(argv.watch, gulp.dest('.public/images'))) // dev
})
