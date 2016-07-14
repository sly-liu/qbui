var gulp = require('gulp');
var cache = require('gulp-cached');
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

gulp.task('img', function(){
    return gulp.src('img/*')
            .pipe(cache('img'))
            .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function(){
    gulp.watch('less/*.less', ['css']);
    gulp.watch('js/*.js', ['js']);
    gulp.watch('img/*', ['img'])
});

gulp.task('default', ['css', 'js', 'img']);