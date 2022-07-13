const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function style()
{
    return  src('app/scss/style.scss')
        .pipe(sass())
        .pipe(dest('app/css'))
}

exports.style = style;

function watch()
{
    gulp.watch('app/scss/*.scss', style)
}

exports.watch = watch;

