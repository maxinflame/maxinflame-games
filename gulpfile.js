import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import gulpCsso from 'gulp-csso';
import rename from 'gulp-rename';

const sync = browserSync.create();
const sassCompiler = gulpSass(sass);

const PATHS = {
  JS: 'src/js',
  JS_DIST: 'www/js',
  SCSS_SRC: 'src/scss',
  SCSS: [
    {
      path: 'src/scss',
      filename: 'style',
    },
  ],
  CSS_DIST: 'www/css',
};

// Server initilization

const server = (done) => {
  sync.init({
    server: {
      baseDir: PATHS.HTML_DIST,
    },
    notify: false,
    ui: false,
  });
  done();
};

const reloadServer = () => {
  sync.reload();
};

// building scripts

const js = () => {
  return gulp
    .src([`${PATHS.JS}/snake.js`])
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(`${PATHS.JS_DIST}`));
};

const jsWatcher = () => {
  gulp.watch(`${PATHS.JS}/**/*.{js,json}`, gulp.series(js));
};

// styles

const buildCSS = (file) => {
  return gulp
    .src(`${file.path}/${file.filename}.scss`)
    .pipe(sassCompiler())
    .pipe(gulpCsso())
    .pipe(rename(`${file.filename}.min.css`))
    .pipe(gulp.dest(`${PATHS.CSS_DIST}`));
};

const styles = (done) => {
  PATHS.SCSS.forEach((file) => buildCSS(file));
  reloadServer();
  done();
};

const stylesWatcher = () => {
  gulp.watch(`${PATHS.SCSS_SRC}/**/*.scss`, gulp.series(styles));
};

const start = (done) => {
  gulp.series(server, gulp.parallel(jsWatcher, stylesWatcher))(done);
};

export { start };

export function build(done) {
  gulp.series(styles, js)(done);
}
