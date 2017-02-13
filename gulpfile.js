var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath: 'src/',
    devPath: 'build/',
    prdPath: 'dist/'
};

gulp.task('lib', function () {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath + 'vendor'))
        .pipe(gulp.dest(app.prdPath + 'vendor'))
        .pipe($.connect.reload());
});

gulp.task('html', function () {
    gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});

gulp.task('json', function () {
    gulp.src(app.srcPath + 'data/**/*.json')
        .pipe(gulp.dest(app.devPath + 'data'))
        .pipe(gulp.dest(app.prdPath + 'data'))
        .pipe($.connect.reload());
});

gulp.task('less', function () {
    gulp.src(app.srcPath + 'style/**/*.less')
        .pipe($.less())
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe($.connect.reload());
});

gulp.task('js', function () {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe($.connect.reload());
});

gulp.task('image', function () {
    gulp.src(app.srcPath + 'images/**/*')
        .pipe(gulp.dest(app.devPath + 'images'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath + 'images'))
        .pipe($.connect.reload());
});

gulp.task('clean', function () {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean());
});

gulp.task('build', ['lib', 'html', 'json', 'less', 'js', 'image']);

gulp.task('serve',['build'],function(){
    $.connect.server({
        root:[app.devPath],
        livereload:true,
        port:5005
    });
    open('http://localhost:5005');
    gulp.watch(app.srcPath+'script/**/*.js',['js']);
    gulp.watch('bower_components/**/*.js',['lib']);
    gulp.watch(app.srcPath+'**/*.html',['html']);
    gulp.watch(app.srcPath+'data/**/*.json',['json']);
    gulp.watch(app.srcPath+'style/**/*.less',['less']);
    gulp.watch(app.srcPath+'images/**/*',['image']);
});

gulp.task('default',['serve']);