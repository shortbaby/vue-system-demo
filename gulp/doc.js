/**
 * @fileOverview copy doc
 * @author XiaoBin Li
 */

'use strict';

var gulp = require('gulp');

gulp.task('doc', function () {
    gulp
        .src(
            [
                '课程导入模板.xlsx'
            ]
        )
        .pipe(gulp.dest('./output'));

});