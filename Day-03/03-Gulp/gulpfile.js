var gulp = require('gulp');
var browserify = require('browserify');
var through2 = require('through2');

gulp.task('build', function () {
    return gulp.src('./src/app.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path, { debug: process.env.NODE_ENV === 'development' })
                .transform(require('babelify'))
                .bundle(function (err, res) {
                    if (err) { return next(err); }

                    file.contents = res;
                    next(null, file);
                });
        }))
        .on('error', function (error) {
            console.log(error.stack);
            this.emit('end');
        })
        .pipe(require('gulp-rename')('app.js'))
        .pipe(gulp.dest('./dist'));
});
