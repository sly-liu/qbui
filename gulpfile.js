var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('css', function(){
    return gulp.src('less/qb.less')
            .pipe(less())
            .pipe(gulp.dest('dist/css'))
            .pipe(cleanCss())
            .pipe(rename('qb.min.css'))
            .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function(){
    return gulp.src('js/*.js')
            .pipe(concat('qb.js'))
            .pipe(gulp.dest('dist/js'))
            .pipe(uglify())
            .pipe(rename('qb.min.js'))
            .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['css', 'js']);