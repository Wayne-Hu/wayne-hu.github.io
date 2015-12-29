var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('default', function() {
    console.log('hello');
});

gulp.task('pack', function () {
    gulp.src(__dirname + '/src/entry.jsx')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dest/js'));
});