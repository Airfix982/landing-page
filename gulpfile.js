const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

var gulp = require("gulp"),
    //sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

    var browserSync = require("browser-sync").create();


    function style() 
    {
        return (
            gulp
                .src("styles/*.sass")
                .pipe(sourcemaps.init())    // Initialize sourcemaps before compilation starts
                .pipe(sass())      
                .on("error", sass.logError)
                .pipe(postcss([autoprefixer(), cssnano()]))// Use postcss with autoprefixer and compress the compiled file using cssnano
                .pipe(sourcemaps.write())  // Now add/write the sourcemaps     
                .pipe(gulp.dest("styles"))   
                .pipe(browserSync.stream()) 
                .pipe(dest('app/css'))

        );       
    }

    exports.style = style;

/*function styles()
{
    return  src('app/scss/style.scss')
        .pipe(sass())
        .pipe(dest('app/css'))
}

exports.styles = styles;*/

function watch()
{
    browserSync.init({
	
        server: {
	
            baseDir: "./"
	
        }
	
    });
	
}

gulp.watch(paths.styles.src, style);

gulp.watch("/home/cossieman2000/WORK/landing-page/*.html", reload);

gulp.watch('app/sass/*.sass', style);//old


exports.watch = watch;

