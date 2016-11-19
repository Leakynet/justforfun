var gulp = require("gulp"),
    less = require("gulp-less"),
    minify = require("gulp-clean-css"),
    //uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    //concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    gutil = require("gulp-util")
;


var gulp_src = gulp.src;
gulp.src = function () {
    return gulp_src.apply(gulp, arguments)
    .pipe(plumber(function (error) {
        gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
        this.emit('end');
    }))
}

gulp.task("less", function () {
    return gulp.src("./less/*.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'))
});

gulp.task("watchLESS", function () {
    gulp.watch(["Content/less/*.less", "Content/less/**/*.less"], ["less"]);
});


gulp.task('default', ['less', 'watchLESS']);