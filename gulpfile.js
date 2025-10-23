const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const svgSprite = require("gulp-svg-sprite");

// Шляхи
const paths = {
  scss: './sass/main.scss',
  allScss: './sass/**/*.scss',
  css: './css',
  html: './*.html'
};

// Компіляція Sass → CSS
function compileSass() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream()); // автоматичне оновлення
}

// Компіляція SVG в один справйт
// ./images/sprite.svg
function compileSVG() {
  const config = {
      mode: {
          stack: {
              sprite: "../sprite.svg"
          }
      }
  };

  return gulp.src("images/**/*.svg")
    .pipe(svgSprite(config))
    .pipe(gulp.dest("images/"));
}


// Локальний сервер + вотчер
function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch([paths.allScss], compileSass);
  gulp.watch(paths.html).on('change', browserSync.reload);

  compileSVG();
}

// Задачі
exports.sass = compileSass;
exports.default = gulp.series(compileSass, serve);