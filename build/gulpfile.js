'use strict';

var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var es2015      = require('babel-preset-es2015');
//var es2016     = require('babel-preset-es2016');
var rename      = require('gulp-rename');


gulp.task('default', browserifyDistTask);

gulp.task('dist',    browserifyDistTask);
gulp.task('dev',     browserifyDevTask );


/**
 * Build for distribution - slower 
 * @returns
 */
function browserifyDistTask() {
	
	function showOnError(err) {	if (err) { console.error(err.stack); } } 
	
    return browserify({
    		entries: '../js/flo-poly.js',
    		plugins: ["transform-es2015-arrow-functions"],
    		standalone: 'FloPoly',
    	})
		.transform("babelify", { presets: [es2015] })
    	.bundle(showOnError)
    	.pipe(source('flo-poly.js'))
    	.pipe(gulp.dest('../dist/'))
    	.pipe(rename({ extname: '.min.js' }))
    	.pipe(buffer())
    	.pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../dist/'));
}


/**
 * Build for development - faster 
 * @returns
 */
 function browserifyDevTask() {
	
	function showOnError(err) {	if (err) { console.error(err.stack); } } 
	
    return browserify({
    		entries: '../js/flo-poly.js',
    		plugins: ["transform-es2015-arrow-functions"],
    		standalone: 'FloPoly',
    	})
    	.bundle(showOnError)
    	.pipe(source('flo-poly.js'))
    	.pipe(gulp.dest('../dist/'));
}
