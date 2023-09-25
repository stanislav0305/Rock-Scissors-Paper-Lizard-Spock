const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('prefixer', async function () {
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('copy-css-map-files', function () {
    return gulp.src('./css/*.css.map')
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('copy-img-files', function () {
    return gulp.src('./img/*.*')
        .pipe(gulp.dest('./src/img/'));
});

gulp.task('copy-html-files', function () {
    return gulp.src('./app.html')
        .pipe(gulp.dest('./src/'));
});


gulp.task('all-to-src', gulp.series('prefixer', 'copy-css-map-files', 'copy-img-files', 'copy-html-files'));
//gulp.task('all-to-src', gulp.parallel('prefixer', 'copy-css-map-files', 'copy-img-files', 'copy-html-files'));
