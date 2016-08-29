
import gulp from 'gulp'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'

let b = browserify({
  entries: ['./src/index.jsx'],
  cache: {},
  packageCache: {},
  plugin: [watchify],
  debug: true
})
b.transform(babelify, {
  presets: ['es2015', 'react'],
  extensions: ['.jsx']
})
b.on('update', bundle)
b.on('log', function (msg) {
  process.stdout.write('\n');
  console.log(msg)
})
b.on('file', function(file) {
  process.stdout.write('.');
})

function bundle() {
  b.bundle()
    .on('error', (errors) => {
      console.log(errors)
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'))
}

gulp.task('default', () => {
  bundle()
})
