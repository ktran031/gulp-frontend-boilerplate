import gulp from 'gulp';
import sass from 'gulp-sass';
var sourcemaps = require('gulp-sourcemaps');
import cleanCSS from 'gulp-clean-css';
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";

const sassOptions = {outputStyle: 'expanded', sourceComments: true, errLogToConsole: true};

exports.sass = () => (
    gulp.src('./src/scss/**/*.{scss,sass}')
    .pipe(sass(sassOptions))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream: true}))
);

exports.images = () => (
    gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
    .pipe(browserSync.reload({stream: true}))
);

exports.copy = () => (
    gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}))
);

exports.minifycss = () => (
    gulp.src('./dist/css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8', level: 2}))
    .pipe(gulp.dest('dist/css'))
);

exports.scripts = () => (
    gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html' 
        },
        notify: false,
        injectChanges: true
    });
    gulp.watch('./src/scss/**/*', gulp.series('sass'));
    gulp.watch('./src/images/**/*', gulp.series('images'));
    gulp.watch('./src/*.html', gulp.series('copy'));
    gulp.watch('./src/js/*.js', gulp.series('scripts'));
    gulp.watch('./dist/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));