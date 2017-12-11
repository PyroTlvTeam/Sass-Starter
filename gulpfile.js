var gulp = require('gulp');
// var less = require('gulp-less');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var tinypng = require('gulp-tinypng-compress');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'site'
        },
    });
});

gulp.task('sass', function () {
  return gulp.src('site/assets/scss/style.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(plumber())
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest('site/assets/css'))
	.pipe(sourcemaps.init())
	.pipe(cleanCSS())
	.pipe(rename({ suffix: '.min' }))
	.pipe(browserSync.stream());
});

gulp.task('sass:watch', ['sass', 'browser-sync'], function () {
	gulp.watch('site/assets/scss/*.scss', ['sass']);
	gulp.watch('site/**/*.html', browserSync.reload);
	gulp.watch('site/**/*.css', browserSync.reload);
	gulp.watch('site/**/*.js', browserSync.reload);
});

gulp.task('tinypng', function () {
    return gulp.src('site/assets/img/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'UnflAHw7cw_9Xh36mqQL3hhqDGiS5stP',
            log: true
        }))
        .pipe(gulp.dest('site/assets/img/min'));
});

gulp.task('default', [ 'sass:watch' ]);


// Hi