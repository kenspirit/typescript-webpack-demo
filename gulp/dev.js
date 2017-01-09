'use strict'

let gulp = require('gulp');

gulp.task('copyNonTS', function() {
  gulp.src(['*', '!*.ts'], { cwd : 'src/**' })
    .pipe(gulp.dest('build/src'));
})

gulp.task('dev', function() {
  gulp.watch('src/**/*', ['webpack']);
});
