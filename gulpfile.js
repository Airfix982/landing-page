const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

var gulp = require("gulp"),
    //sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps");

    var paths = {
	
        styles: {
        
            // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        
            src: "styles/**/*.sass",
        
            // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        
            dest: "styles"
        
        }
            // Easily add additional paths
	
    // ,html: {
	
    //  src: '...',
	
    //  dest: '...'
	
    // }
	
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
	
    gulp.watch("/home/cossieman2000/WORK/landing-page/*.html", reload);
	
}

gulp.watch('app/sass/*.sass', style);//old


exports.watch = watch;

