const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const sync = require("browser-sync").create();
const pug = require('gulp-pug');


const styles = () => {
  return gulp.src("src/sass/style.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css/"))
}

const server = (done) => {
  sync.init({
    server: {
        baseDir: "./dist"
    }
  });
  done();
}


exports.styles = styles;

const mincss = () => {
    return gulp.src("dist/css/style.css")
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream());
}

const createHtml = () => {
  return gulp.src('./src/pug/pages/**/*.pug')
    .pipe(pug(
      {
        pretty: true
      }
    ))
    .pipe(gulp.dest('./dist'))
}


const watcher = () => {
  gulp.watch("src/sass/**/*.scss", gulp.series(
    styles,
    mincss,
  ))

  gulp.watch("src/pug/**/*.pug", gulp.series(
    createHtml,
  ))

  gulp.watch('dist/*.html').on('change', gulp.series(sync.reload))
}

const start = gulp.series(
  gulp.parallel(styles, createHtml),
  gulp.parallel(watcher, server)
);

exports.default = start;

