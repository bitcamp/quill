require('dotenv').load({silent: true});

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

var environment = process.env.NODE_ENV;

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('default', function(){
  console.log('yo. use gulp js');
});

gulp.task('js', function () {
  if (environment !== 'dev'){
    // Minify for non-development
    gulp.src(['client/src/**/*.js', 'client/views/**/*.js'])
      .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .on('error', swallowError)
        .pipe(uglify())
      .pipe(gulp.dest('client/build'));
  } else {
    gulp.src(['client/src/**/*.js', 'client/views/**/*.js'])
      .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .on('error', swallowError)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('client/build'));
  }
});