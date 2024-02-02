const gulp = require('gulp');
const gulpif = require('gulp-if');
const sync = require("browser-sync").create();
const pug = require('gulp-pug');
const emitty = require("@zoxon/emitty");
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const rename = require('gulp-rename');


const PATHS = {
  PUG: 'src/pug/',
  PUG_PAGES: 'src/pug/pages/',
  HTML_DIST: './build/',
  JS: 'src/js',
  JS_DIST: 'build/js',
  SCSS_SRC: 'src/scss',
  SCSS: [
    {
      path: 'src/scss',
      filename: 'style',
    },
  ],
  CSS_DIST: 'build/css',
}

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
}

const reloadServer = () => {
  sync.reload();
}


// Building pug

const emittyPug = emitty.setup(PATHS.PUG, 'pug', {
  makeVinylFile: true,
});

global.watch = false;
global.emittyChangedFile = {
  path: '',
  stats: null,
};

const buildPug = () => {
  return gulp.src(`./${PATHS.PUG_PAGES}/*.pug`)
  .pipe(
    gulpif(
      global.watch,
      emittyPug.stream(
        global.emittyChangedFile.path,
        global.emittyChangedFile.stats,
      ),
    ),
  )
  .pipe(
    pug({
      pretty: true
    })
  )
  .pipe(gulp.dest(PATHS.HTML_DIST))
}

const pugWatcher = () => {
  global.watch = true;
  gulp.watch(`src/**/*.pug`, gulp.series(buildPug))
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats,
      };
    });
}

// end building pug


// building scripts

const js = () => {
  return gulp.src([`${PATHS.JS}/snake.js`])
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(`${PATHS.JS_DIST}`))
};

const jsWatcher = () => {
  gulp.watch(`${PATHS.JS}/**/*.{js,json}`, gulp.series(js));
}


// styles

const buildCSS = (file) => {
  return gulp.src(`${file.path}/${file.filename}.scss`)
  .pipe(sass())
  .pipe(csso())
  .pipe(rename(`${file.filename}.min.css`))
  .pipe(gulp.dest(`${PATHS.CSS_DIST}`))
}

const styles = (done) => {
  PATHS.SCSS.forEach(file => buildCSS(file));
  reloadServer();
  done();
}

const stylesWatcher = () => {
  gulp.watch(`${PATHS.SCSS_SRC}/**/*.scss`, gulp.series(styles));
}


const start = (done) => {
  gulp.series(
    server,
    gulp.parallel(
      pugWatcher,
      jsWatcher,
      stylesWatcher,
    )
  )(done)
}

exports.start = start; 

exports.build = (done) => {
  gulp.series(
    styles,
    js,
  )(done)
}