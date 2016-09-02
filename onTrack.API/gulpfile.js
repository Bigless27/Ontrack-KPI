var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var pkg = require('./package.json');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
// var nodemon = require('gulp-nodemon');


var onError = function(err) {
	gutil.beep();
	console.log(err);
	this.emit('end')
}


gulp.task('nodemon', function(done) {

	var started = false;
	return nodemon({
		script: 'index.js',
		ignore: ['gulpfile.js', 'node_modules/**/*', '.gitignore'],
	})
	.on('start', function() {
		// to avoid nodemon being started multiple times
		if(!started) {
			started = true
			done()
		}
		browserSync.reload()
	})
})

gulp.task('sass', function() {
	return gulp.src('./client/sass/*.scss')
	.pipe(plumber({
		errorHandler: onError
	}))
	.pipe(sass())
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
})

gulp.task('minify-css', ['sass'], function() {
	return gulp.src('build/css/*.css')
	.pipe(plumber({
		errorHandler: onError
	}))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({ suffix: '.min'}))
	.pipe(browserSync.reload({
		stream: true
	}))
})


gulp.task('scripts', function() {
	return gulp.src('client/**/*.js')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(concat('appAll.js'))
		.pipe(gulp.dest('./build/js'))
})


gulp.task('minify-js', function() {
	return gulp.src('build/js')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min'}))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

gulp.task('default', ['sass', 'minify-css', 'scripts'])

gulp.task('browserSync', function() {
	browserSync.init({
		port: 8000,
		proxy: 'localhost:3000'
	})
})


gulp.task('dev', ['browserSync', 'sass', 'scripts', 'minify-css'], function() {
	gulp.watch('client/sass/*.scss', ['sass', 'minify-css'])

	gulp.watch('client/**/*.js', ['scripts'], browserSync.reload)
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('client/api/**/*.html', browserSync.reload)
	gulp.watch('build/js/*.js', browserSync.reload)
	gulp.watch('build/css/*.css', browserSync.reload)
})






