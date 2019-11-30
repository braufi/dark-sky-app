var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var gp_concat = require('gulp-concat');
var gp_rename = require('gulp-rename');
var gp_uglify = require('gulp-uglify');
var path = require('path');

//stylesheet
gulp.task('css-main', function(){
  return gulp.src(
    [
        'public/stylesheets/bootstrap.min.css',
        'public/stylesheets/font-awesome.min.css',
        'public/stylesheets/animate.min.css',
        'public/stylesheets/ionicons.min.css',
        'public/stylesheets/owl.carousel.min.css',
        'public/stylesheets/lightbox.min.css',
        'public/stylesheets/style.css'
  ])
  .pipe(minifyCSS())
  .pipe(autoprefixer('last 1 version', 'safari 5', 'ie 8', 'ie 9' ))
  .pipe(gp_concat('style.min.css'))
  .pipe(gulp.dest('public/dist/styles/'))
});

//stylesheet
gulp.task('js-main', function(){
  return gulp.src(
    [
        'public/javascripts/jquery.min.js',
        'public/javascripts/jquery-migrate.min.js',
        'public/javascripts/bootstrap.bundle.min.js',
        'public/javascripts/easing.min.js',
        'public/javascripts/mobile-nav.js',
        'public/javascripts/wow.min.js',
        'public/javascripts/waypoints.min.js',
        'public/javascripts/counterup.min.js',
        'public/javascripts/owl.carousel.min.js',
        'public/javascripts/isotope.pkgd.min.js',
        'public/javascripts/lightbox.min.js',
        'public/javascripts/contactform.js',
        'public/javascripts/main.js'
      ]
    )
    .pipe(gp_uglify())
    .pipe(gp_concat('main.min.js'))
    .pipe(gulp.dest('public/dist/js/'))
});
//fonts
gulp.task('copy-fonts', function(){
  return gulp.src(
    [
      'public/fonts/**'
    ]
  )
    .pipe(gulp.dest('public/dist/fonts/'))
});

gulp.task('outputs', gulp.parallel('css-main', 'js-main', 'copy-fonts'))
