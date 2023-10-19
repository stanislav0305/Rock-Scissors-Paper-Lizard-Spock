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
const webpHTML = require('gulp-webp-html-nosvg');

// CSS
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sassGlob = require('gulp-sass-glob');
const webpCss = require('gulp-webp-css');

// IMG
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// JS
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });

const isProd = args.prod;
const distDir = isProd ? 'prod' : 'dev';

gulp.task('start-info', function (done) {
    const envDescription = isProd ? '--- PRODUCTION ---' : '--- DEVELOPMENT ---';
    console.log(envDescription);
    done();
});

gulp.task('clean', function () {
    //allowEmpty - разрешает пустой поток (когда папка distDir несуществует)
    const options = {
        read: false,
        allowEmpty: true
    }

    return gulp.src(`./${distDir}/`, options)
        .pipe(gulpif(fs.existsSync(`./${distDir}`) === true, clean({ force: true })));
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

    return gulp.src(`./${distDir}`, { allowEmpty: true })
        .pipe(gulpif(!isProd, serverLivereload(serverLivereloadSettings)));
});

gulp.task('build-html', function () {
    const dist = `./${distDir}/`;
    const fileIncludeSettings = {
        prefix: '@@',
        basepath: '@file'
    };

    return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
        //{hasChanged: changed.compareContents} - change page if was changed block html file
        .pipe(gulpif(!isProd, changed(dist, { hasChanged: changed.compareContents })))
        .pipe(fileInclude(fileIncludeSettings))
        .pipe(webpHTML())
        .pipe(gulp.dest(dist));
});

gulp.task('copy-images', function () {
    const src = './src/assets/img/*.*'
    const dist = `./${distDir}/assets/img/`

    return gulp.src(src)
        .pipe(gulpif(!isProd, changed(dist)))
        .pipe(webp())
        .pipe(gulp.dest(dist))
        .pipe(gulp.src(src))
        .pipe(gulpif(!isProd, changed(dist)))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest(dist));
});

gulp.task('build-css', function () {
    const dist = `./${distDir}/assets/css/`
    const cssStyle = isProd ? 'compressed' : 'expanded';

    return gulp.src('./src/assets/sass/style.sass')
        .pipe(gulpif(!isProd, changed(dist)))
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: cssStyle }).on('error', sass.logError))
        .pipe(webpCss())
        .pipe(gulpif(isProd, autoprefixer({ cascade: false })))
        .pipe(gulpif(!isProd, sourcemaps.write('./')))
        .pipe(gulp.dest(dist));
});

gulp.task('build-js', function () {
    const dist = `./${distDir}/js`

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
    gulp.watch('./src/assets/sass/**/*.sass', gulp.parallel('build-css'));
    //добавляет новые картинки, но ничего не удаляет из distDir
    //т.е. при удалении картинки в src она не удалится в distDir
    gulp.watch('./src/assets/img/**/*', gulp.parallel('copy-images'));
    gulp.watch('./src/ts/**/*.ts', gulp.parallel('build-js'));
});

gulp.task('default',
    gulp.series(
        'start-info',
        'clean',
        gulp.parallel('build-html', 'copy-images', 'build-css', 'build-js'),
        gulp.parallel('start-server-livereload', 'watch')
    )
);