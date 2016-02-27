var gulp = require('gulp'),
    utf8Convert = require('gulp-utf8-convert'),
    es = require('event-stream'),
    inject = require('gulp-inject'),
    utf8Convert = require('gulp-utf8-convert'),
    concat = require('gulp-concat');
 
gulp.task('injectScripts', function() {
    var base = gulp.src(['./src/scripts/*.js'], {read: false});
    var services = gulp.src(['./src/scripts/services/**/*.js'], {read: false});
    var directives = gulp.src(['./src/scripts/directives/*.js'], {read: false});
    var filters = gulp.src(['./src/scripts/filters/*.js'], {read: false});
    var controllers = gulp.src(['./src/scripts/controllers/**/*.js'], {read: false});
                
    gulp.src('./src/*.html')
        .pipe(inject(es.merge(base,services,directives,filters,controllers), {relative:true}))
        .pipe(gulp.dest('./src'));
}); 
 gulp.task('convert',function() {
    gulp.src("./src/scripts/**/*.js")
        .pipe(utf8Convert({
            encNotMatchHandle:function (file) {
                //notify 
            }
        }))
        .pipe(gulp.dest('./'));
});

//TO DO : à terminer
gulp.task('deploy', function() {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./deploy/'));
});