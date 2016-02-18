var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('less', function () {
  gulp.src('css/*.less')
    .pipe(less())
    .pipe(concat('common.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(nano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src(['*.html'])
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src(['js/*.js'])
    .pipe(uglify())
    .pipe(rename({
      basename: 'common',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

gulp.task('connect', function () {
  connect.server({
    livereload: true,
    port: 1337,
    root: [__dirname]
  });
});

gulp.task('watch', function () {
  gulp.watch('css/*.less', ['less']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('./*.html', ['html']);
})

gulp.task('default', ['less', 'js', 'html', 'connect', 'watch']);
