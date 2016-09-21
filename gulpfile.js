// npm uninstall `ls -1 node_modules | tr '/\n' ' '`


var gulp = require('gulp'),
stylus = require('gulp-stylus'),
autoprefixer = require('gulp-autoprefixer'),
gcmq = require('gulp-group-css-media-queries');

//DEFAULT
//----------------------------------------------------------------------

gulp.task('default', ['stylus', 'autoprefixer' ,'watch']);


// COMPÌLE
//----------------------------------------------------------------------

gulp.task('stylus', function(){
	return gulp.src('css/stylus/*.styl')
	.pipe(stylus())
	.pipe(gulp.dest('css'));
});




// WATCH
//----------------------------------------------------------------------

gulp.task('watch', function() {
	gulp.watch('css/stylus/**/*.styl', ['stylus', 'autoprefixer']);
});



// autoprefixer------------------------------------

gulp.task('autoprefixer', () =>
   gulp.src('./css/*.css')
       .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false
       }))
       .pipe(gulp.dest('./css'))
);

// ----------------------------------------------------------



//MEDIA QUERY COMBINER FOR PREPROCESSOR NESTING
//----------------------------------------------------------------------

gulp.task('gcmq', function () {
	gulp.src('css/*.css')
		.pipe(gcmq())
		.pipe(gulp.dest('css'));
});
