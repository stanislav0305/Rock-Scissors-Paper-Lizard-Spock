const fs = require('fs');
const args = require('yargs').argv;

const gulp = require('gulp');
const gulpif = require('gulp-if');

const clean = require('gulp-clean');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });
const serverLivereload = require('gulp-server-livereload');

const isProd = args.prod;

gulp.task('start-info', function (done) {
    const envDescription = isProd ? '--- PRODUCTION ---' : '--- DEVELOPMENT ---';
    console.log(envDescription);
    done();
});

gulp.task('clean', function () {
    //allowEmpty - разрешает пустой поток (когда папка dist несуществует)
    const options = {
        read: false,
        allowEmpty: true
    }

    return gulp.src('./dist/', options)
        .pipe(gulpif(fs.existsSync('./dist') === true, clean({ force: true })));
});

gulp.task('start-server-livereload', function (done) {
    if (isProd) {
        done();
        return;
    }

    const serverLivereloadSettings = {
        livereload: true,
        open: true,
        port: 8005
    };

    return gulp.src('./dist', { allowEmpty: true })
        .pipe(gulpif(!isProd, serverLivereload(serverLivereloadSettings)));
});

gulp.task('build-html', function () {
    const fileIncludeSettings = {
        prefix: '@@',
        basepath: '@file'
    };

    return gulp.src('./src/*.html')
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-images', function () {
    return gulp.src('./src/sass/img/*.*')
        .pipe(imagemin([imagemin.optipng({ optimizationLevel: 5 })]))
        .pipe(gulp.dest('./dist/css/img/'));
});

gulp.task('build-css', function () {
    const cssStyle = isProd ? 'compressed' : 'expanded';

    return gulp.src('./src/sass/style.sass')
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass({ outputStyle: cssStyle }).on('error', sass.logError))
        .pipe(gulpif(isProd, autoprefixer({ cascade: false })))
        .pipe(gulpif(!isProd, sourcemaps.write('./')))
        .pipe(gulp.dest('./dist/css/'));

});


gulp.task('build-js', function () {
    return gulp.src('./src/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('watch', function (done) {
    if (isProd) {
        done();
        return;
    }

    gulp.watch('./src/**/*.html', gulp.parallel('build-html'));
    gulp.watch('./src/sass/**/*.sass', gulp.parallel('build-css'));
    //добавляет новые картинки, но ничего не удаляет из dist 
    //т.е. при удалении картинки в src она не удалится в dist
    gulp.watch('./src/sass/img/**/*', gulp.parallel('copy-images'));
    gulp.watch('./src/*.ts', gulp.parallel('build-js'));
})

gulp.task('default',
    gulp.series(
        'start-info',
        'clean',
        gulp.parallel('build-html', 'copy-images', 'build-css', 'build-js'),
        gulp.parallel('start-server-livereload', 'watch')
    )
);

