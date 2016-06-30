/**
 * swig部署脚本
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

var swig = require('gulp-swig');
var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var replace = require('gulp-replace');
gulp.task('swig', function() {
    gulp.src('view/*.html')
        .pipe(swig())
        .pipe(minifyHtml())
        .pipe(replace(/output\//g, ''))
        .pipe(replace(/\.scss/g, '.css'))
        .pipe(gulp.dest('./output/view'))
});