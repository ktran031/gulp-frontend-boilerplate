import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');

const sassOptions = {outputStyle: 'expanded', sourceComments: true, errLogToConsole: true};

exports.sass = () => (
    gulp.src('./src/scss/**/*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer('last 2 versions'))
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
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({stream: true}))
);

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'becoming-a-patient.html' 
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