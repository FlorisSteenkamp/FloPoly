'use strict';

var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var env        = require('babel-preset-env');
var rename     = require('gulp-rename');
var derequire  = require('gulp-derequire');
var ts         = require("gulp-typescript");
var tsify      = require("tsify");
var typedoc    = require("gulp-typedoc");

var tsProject  = ts.createProject("./tsconfig.json");

gulp.task('default', nodeTask);
gulp.task('node',    nodeTask);
gulp.task('browser', browserTask);
gulp.task("docs",    docsTask);


function docsTask() {
	return gulp
        .src([
			"index.ts"
			/*
			"./src/all-roots-recursive.js",
    		"./src/all-roots-vas.js",
    		"./src/core-operators.js",
    		"./src/flo-poly.js",
    		"./src/root-operators.js",
    		"./src/random.js",
			"./src/mobius.js",
    		"./src/root-bounds.js",
			"./src/error-analysis.js"*/
		])
        .pipe(typedoc({
			mode: "modules",
			exclude: "**/*..ts",
            module: "commonjs",
            target: "es2015",
            //out: "docs/",
			name: "Poly",
			json: "docs/docs.json",
			//ignoreCompilerErrors: true,
        }));
}


/**
 * Build for browser.
 */
function nodeTask() {

	function showOnError(err) {	
		if (!err) { return; }
		
		console.error(err.toString());
		console.error(err.stack); 
	}

	return tsProject.src()
		.pipe(tsProject())
		.pipe(gulp.dest("node"));
}


/**
 * Build for browser.
 */
function browserTask() {
	
	function showOnError(err) {	
		if (!err) { return; }
		
		console.error(err.toString());
		console.error(err.stack); 
	}
	
    browserify({
    		entries: '../index.ts',
    		standalone: 'FloPoly',
   	})
	.plugin(tsify)
	.bundle(showOnError)
	.pipe(source('index.js'))
	.pipe(derequire())
	.pipe(gulp.dest('../browser/'))
	.pipe(rename({ extname: '.min.js' }))
	.pipe(buffer())
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.on('error', showOnError)
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('../browser/'));
}
