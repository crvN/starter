var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cleanCSS = require("gulp-clean-css");
var plumber = require("gulp-plumber");

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./sass/*.scss", ['sass']);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp
      .src("./sass/*.scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(rename({ suffix: ".min", prefix: "" }))
      .pipe(autoprefixer({
          browsers: ["last 15 versions"],
          cascade: false
        }))
      .pipe(cleanCSS())
      .pipe(gulp.dest("./css"))
      .pipe(browserSync.stream());
});

// js watch
gulp.task('js', function () {
    return (gulp
        .src([
        //   "./libs/modernizr/modernizr.js",
          "./libs/jquery/jquery-1.11.2.min.js",
          "./libs/waypoints/waypoints.min.js",
          "./libs/animate/animate-css.js",
          "./libs/tingle/tingle.min.js",
          "./libs/bootstrap/js/bootstrap.min.js",
          "./libs/plugins-scroll/plugins-scroll.js"
        ])
        .pipe(plumber())
        .pipe(concat("libs.js"))
        .pipe(uglify()) //Minify libs.js
        .pipe(gulp.dest("./js/")) );
});

gulp.task("scripts", function() {
  return gulp
    .src(["./js/libs.js", "./js/common.js"])
    .pipe(plumber())
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(gulp.dest("./js"));
});

gulp.task('default', ['serve']);