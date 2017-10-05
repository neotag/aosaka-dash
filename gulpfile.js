const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require("vinyl-source-stream")
const watch = require('gulp-watch');
const browserify = require('browserify');
const babelify = require('babelify');
const webserver = require('gulp-webserver');

const HTDOCS = "docs/";
const SRC_ROOT = "src/"
const SRC_JS = SRC_ROOT + "js/";
const JS_ENTRY_FILE = "app.js";
const DIST_ROOT = HTDOCS + "assets/";
const DIST_JS = DIST_ROOT + "js/";

const js = () => {
  browserify({
    entries: SRC_JS + JS_ENTRY_FILE,
    extensions: ['js']
  })
    .transform(babelify)
    .bundle()
    .on('error', gutil.log)
    .pipe(source(JS_ENTRY_FILE))
    .pipe(gulp.dest(DIST_JS));
}

gulp.task('js', js);

gulp.task('watchJs', () => {
  watch(SRC_JS, js);
})

gulp.task('server', () => {
  gulp.src(HTDOCS)
    .pipe(webserver({
      port: 8000,
      livereload: true,
      host: '0.0.0.0'
    }));
});

gulp.task('build', [ 'js' ]);
gulp.task('watch', [ 'watchJs' ]);
gulp.task('default', [ 'build', 'server', 'watch' ]);

