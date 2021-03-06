/**
 * @fileOverview resolve scss
 * @author XiaoBin Li
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');

gulp.task('scss', ['scss:m'], function () {
    return gulp
    	.src([
    		'./src/resource/css/main.scss',
    		'./src/resource/css/plugins.scss'
    	])
        .pipe(sass())
        // .pipe(replace(/\.jpg/g, '.webp'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./output/src/resource/css'));

});

gulp.task('scss:m', function() {
    return gulp
        .src([
            './src/m/*/*.scss'
        ])
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('./output/src/m'));
});
