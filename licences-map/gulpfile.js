var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sassGlob = require('gulp-sass-glob');
var inject = require('gulp-inject');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');

var bootstrap = 'node_modules/bootstrap/scss';


gulp.task('js', function() {
   // gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.js').pipe(gulp.dest("app/js"))
   // gulp.src('node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest("app/js"))
    gulp.src('node_modules/axios/dist/axios.min.js').pipe(gulp.dest("app/js"))
 
});


gulp.task("sass",function(){   
    gulp.src("app/scss/**/*.scss")
     .pipe(sassGlob())
    .pipe(sass({includePaths: [bootstrap]}))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("sourcemaps"))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync',function(){
    browserSync.init({
        server:{
            baseDir: 'app',
            proxy: 'http://hvvdproitw10d27'
        },
        
    })
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});


gulp.task('watch',['browserSync','sass','js','useref'],function(){
    gulp.watch('app/scss/**/*.scss',['sass']);
    gulp.watch('app/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);
});
//gulp.watch('app/scss/**/*.scss', ['sass']); 