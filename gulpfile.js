// npm uninstall `ls -1 node_modules | tr '/\n' ' '`

var gulp = require('gulp'),
stylus = require('gulp-stylus'),
concat = require('gulp-concat'),
gcmq = require('gulp-group-css-media-queries'),
uglify = require('gulp-uglify'),
cssnano = require('gulp-cssnano'),
autoprefixer = require('gulp-autoprefixer');


//DEFAULT
//----------------------------------------------------------------------

gulp.task('default', ['stylus', 'autoprefixer', 'nano', 'compress', 'watch']);


// COMPILE
//----------------------------------------------------------------------

gulp.task('stylus', function(){
	return gulp.src('src/stylus/*.styl')
	.pipe(stylus())
	.pipe(gulp.dest('src'));
});

//- UGLIFY
//-------------------------

gulp.task('compress', function(){
	gulp.src(['src/js/vendors.common.js', 'src/js/**/*.model.js', 'src/js/**/*.controller.js', 'src/js/**/*.js'])
	.pipe(concat( 'app.js' ))
	.pipe(gulp.dest('dist'));
	// .pipe(uglify());
});

//- CSSNANO
//-------------------------

gulp.task('nano', function(){
	return gulp.src('dist/main.css')
	.pipe(cssnano())
	.pipe(gulp.dest('css'));
});


// WATCH
//----------------------------------------------------------------------

gulp.task('watch', function() {
	gulp.watch('src/stylus/**/*.styl', ['stylus','autoprefixer', 'nano']);
	gulp.watch('src/js/**/*.js', ['compress']);
});
// ------------------------------------------------------------------------
gulp.task('autoprefixer', () =>
    gulp.src('src/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
);


//MEDIA QUERY COMBINER FOR PREPROCESSOR NESTING
//----------------------------------------------------------------------

gulp.task('gcmq', function(){
	gulp.src('src/*.css')
	.pipe(gcmq())
	.pipe(gulp.dest('dist'));
});
