var gulp = require('gulp');
var cache = require('gulp-cached');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var runSequence = require('run-sequence');

gulp.task('css', function(){
    return gulp.src('less/qb.less')
            .pipe(less())
            .pipe(gulp.dest('dist/css'))
            .pipe(cleanCss())
            .pipe(rename('qb.min.css'))
            .pipe(gulp.dest('dist/css'));
});

var jsPlugins = [
        'js/jquery-ui.js',
        'js/chosen.jquery.js',
        'js/datatables.js',
        'js/datepicker.js',
        'js/icheck.js',
        'js/jquery.checkgroup.js',
        'js/jquery.qtip.js',
        'js/jquery.tab.js'
    ];
gulp.task('js', function(){
    return gulp.src(jsPlugins)
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

gulp.task('clean', function(){
   return del(['dist/*']);
});

gulp.task('default', function(callback){
    runSequence('clean',['css','js','img'], callback);
});