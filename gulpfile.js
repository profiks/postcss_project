var postcss      = require('gulp-postcss'),
    sass         = require('gulp-sass'),
    gulp         = require('gulp'),
    autoprefixer = require('autoprefixer'),
    easysprite   = require('postcss-easysprites'),
    connect      = require('gulp-connect');


gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['IE 8', 'IE 9', 'last 5 versions', 'Firefox > 14', 'Opera > 11.1', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 5']}),
        easysprite({
            imagePath:'app/img/sprites', 
            spritePath: 'app/img'
        })
    ];
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload());
})



gulp.task('html', function() {
  gulp.src('app/*.html')
    .pipe(connect.reload())
});


gulp.task('watch', function() {
  gulp.watch(['app/scss/*.scss', 'app/scss/*/*.scss'], ['css']);
  gulp.watch(['app/*.html', 'app/*/*.html'], ['html']);
});


gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});


gulp.task('default', ['watch', 'html', 'css', 'connect']);

