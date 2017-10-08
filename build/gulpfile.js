'use strict';

var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var env         = require('babel-preset-env');
var rename      = require('gulp-rename');
var derequire   = require('gulp-derequire');

gulp.task('default', browserifyDistTask);

gulp.task('dist',    browserifyDistTask);


/**
 * Build for distribution
 */
function browserifyDistTask() {
	
	function showOnError(err) {	if (err) { console.error(err.stack); } } 
	
    return browserify({
    		entries: '../js/flo-poly.js',
    		standalone: 'FloPoly',
    	})
		.transform("babelify", { presets: [env] })
    	.bundle(showOnError)
		.pipe(source('flo-poly.js'))
		.pipe(derequire())
    	.pipe(gulp.dest('../dist/'))
    	.pipe(rename({ extname: '.min.js' }))
    	.pipe(buffer())
    	.pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../dist/'));
}
