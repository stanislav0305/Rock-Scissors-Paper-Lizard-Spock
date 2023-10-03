const fs = require('fs');
const args = require('yargs').argv;

const gulp = require('gulp');
const gulpif = require('gulp-if');
const clean = require('gulp-clean');
const serverLivereload = require('gulp-server-livereload');
const webpack = require('webpack-stream');
const changed = require('gulp-changed');

// HTML
const fileInclude = require('gulp-file-include');

// CSS
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sassGlob = require('gulp-sass-glob');

// IMG
const imagemin = require('gulp-imagemin');

// JS
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });


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
    const dist = './dist/'
    const fileIncludeSettings = {
        prefix: '@@',
        basepath: '@file'
    };

    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        .pipe(gulpif(!isProd, changed(dist)))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(gulp.dest(dist));
});


gulp.task('copy-images', function () {
    const dist = './dist/img/'

    return gulp.src('./src/img/*.*')
        .pipe(gulpif(!isProd, changed(dist)))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest(dist));
});


gulp.task('build-css', function () {
    const dist = './dist/css/'
    const cssStyle = isProd ? 'compressed' : 'expanded';

    return gulp.src('./src/sass/style.sass')
        .pipe(gulpif(!isProd, changed(dist)))
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: cssStyle }).on('error', sass.logError))
        .pipe(gulpif(isProd, autoprefixer({ cascade: false })))
        .pipe(gulpif(!isProd, sourcemaps.write('./')))
        .pipe(gulp.dest(dist));

});


gulp.task('build-js', function () {
    const dist = './dist/js'

    return gulp.src('./src/ts/**/*.ts')
        .pipe(gulpif(!isProd, changed(dist)))
        .pipe(tsProject())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(dist));
});


gulp.task('watch', function (done) {
    if (isProd) {
        done();
        return;
    }

    gulp.watch('./src/html/**/*.html', gulp.parallel('build-html'));
    gulp.watch('./src/sass/**/*.sass', gulp.parallel('build-css'));
    //добавляет новые картинки, но ничего не удаляет из dist 
    //т.е. при удалении картинки в src она не удалится в dist
    gulp.watch('./src/img/**/*', gulp.parallel('copy-images'));
    gulp.watch('./src/ts/**/*.ts', gulp.parallel('build-js'));
})


gulp.task('default',
    gulp.series(
        'start-info',
        'clean',
        gulp.parallel('build-html', 'copy-images', 'build-css', 'build-js'),
        gulp.parallel('start-server-livereload', 'watch')
    )
);

