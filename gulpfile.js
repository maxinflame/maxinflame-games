const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const sync = require("browser-sync").create();


const styles = () => {
  return gulp.src("sass/style.scss")
  .pipe(sass())
  .pipe(gulp.dest("css/"))
}

const server = () => {
  sync.init({
    server: {
        baseDir: "./"
    }
});
}


exports.styles = styles;

const mincss = () => {
    return gulp.src("css/style.css")
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest("css"))
    .pipe(sync.stream());
}

const watcher = () => {
  gulp.watch("sass/**/*.scss", gulp.series(
    styles,
    mincss,
  ));
}

exports.default = gulp.parallel(
  watcher,
  server,
)
