const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

var gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

    var paths = {
        styles: {
            // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
            src: "./app/scss/*.scss",
            // Compiled files will end up in whichever folder it's found in (partials are not compiled)
            dest: "./app/css/",
        }
};

    var browserSync = require("browser-sync").create();
    
    function style() {
	
        return (
            gulp
                .src(paths.styles.src)
                .pipe(sourcemaps.init())
                .pipe(sass())
                .on("error", sass.logError)
                .pipe(postcss([autoprefixer(), cssnano()]))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(paths.styles.dest))
                .pipe(browserSync.stream())
        );
        
    }
    exports.style = style;

function reload() {
    browserSync.reload();
}

function watch() 
{
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch('./*.html', reload);
}

gulp.watch('./app/scss/*.sass', style);//old


exports.watch = watch;

