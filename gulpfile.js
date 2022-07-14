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
        
                // Add browsersync stream pipe after compilation
        
                .pipe(browserSync.stream())
        
        );
        
    }
    
   /* function style() 
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
    }*/

    exports.style = style;

/*function styles()
{
    return  src('app/scss/style.scss')
        .pipe(sass())
        .pipe(dest('app/css'))
}

exports.styles = styles;*/

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
	
    // We should tell gulp which files to watch to trigger the reload
	
    // This can be html or whatever you're using to develop your website
	
    // Note -- you can obviously add the path to the Paths object
	
    gulp.watch("/home/cossieman2000/WORK/landing-page/*.html", reload);
	
}


/*function watch()
{
    browserSync.init({
	
        server: {
	
            baseDir: "./"
	
        }
	
    });
	
}*/

//gulp.watch(paths.styles.src, style);

gulp.watch('app/sass/*.sass', style);//old


exports.watch = watch;

