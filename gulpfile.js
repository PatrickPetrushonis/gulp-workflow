// ----- ----- ----- ----- Plugins ----- ----- ----- -----
var gulp        = require('gulp'),                //streaming build system
    autoprefix  = require('gulp-autoprefixer'),   //supplies prefixes for cross-browser compatibility
    coffee      = require('gulp-coffee'),         //coffeescript plugin
    concat      = require('gulp-concat'),         //concatenates JavaScript files into a single file
    filter      = require('gulp-filter'),         //filter files in vinyl stream 
    imagemin    = require('gulp-imagemin'),       //minifies gif, jpeg, png, and svg images
    jade        = require('gulp-jade'),           //jade plugin
    jshint      = require('gulp-jshint'),         //lints JavaScript, analyzing code for potential errors
    livereload  = require('gulp-livereload')      //reloads in browser upon detecting changes   
    minifycss   = require('gulp-minify-css'),     //css optimizer built upon clean-css
    notify      = require('gulp-notify'),         //sends messages based on vinyl files or errors
    plumber     = require('gulp-plumber'),        //prevents pipe breaking on error 
    rename      = require('gulp-rename'),         //provides file renaming methods
    sass        = require('gulp-sass'),           //sass plugin
    sourcemaps  = require('gulp-sourcemaps'),     //generates sourcemaps for imported sass files
    uncss       = require('gulp-uncss'),          //removes unused css  
    uglify      = require('gulp-uglify'),         //minifies JavaScript to improve efficiency
    util        = require('gulp-util'),           //utility functions for vinyl stream
    del         = require('del'),                 //cleans specified directory of files and folders
    pngquant    = require('imagemin-pngquant');   //imagemin dependancy

// ----- ----- ----- ----- Paths ----- ----- ----- -----
// Path globs for dest directory
var assets = {
    js      : 'assets/js',
    css     : 'assets/css',
    img     : 'assets/img',
    html    : {
        blog    : 'blog/',
        game    : 'games/'
    }
};

// Path globs for src directory
var source = {
    js      : 'source/js/**/*',
    style   : 'source/sass/style.scss',
    sass    : 'source/sass/**/*.scss',
    img     : 'source/img/**',
    jade    : {
        all     : 'source/jade/**/*.jade',
        root    : 'source/jade/*.jade',
        page    : 'source/jade/pages/*.jade',
        post    : 'source/jade/posts/*.jade',
        game    : 'source/jade/games/*.jade'}
};

/* ----- ----- ----- ----- Tasks ----- ----- ----- -----
default:    standard build on gulp command
build:      develops source files into assets folder
develop:    builds and runs auto reloading development server
debug:      builds with clean, lint, and watch
*/

gulp.task('default',    ['build']);
gulp.task('build',      ['styles', 'scripts', 'images', 'jade']);
gulp.task('develop',    ['build', 'reload']);
gulp.task('debug',      ['clean', 'lint', 'build', 'watch']);

// Clean build directory
gulp.task('clean', function(){
    del([assets.js, assets.css, assets.img]);
});

// Lint all JavaScript source files
gulp.task('lint', function() {
    return gulp.src(source.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Watches source files and rebuilds on change
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(source.coffee,    ['scripts']);
    gulp.watch(source.js.all,    ['scripts']);
    gulp.watch(source.sass,      ['styles']);
    gulp.watch(source.img,       ['images']);
    gulp.watch(source.jade.all,  ['jade']);
});

// Triggers livereload
gulp.task('reload', function() {
    return gulp.src(source.js, source.sass, source.img, source.jade.all)
        .pipe(livereload());
});

// ----- ----- ----- ----- Scripts ----- ----- ----- -----
var coffeeFilter = filter(['**/*.js.coffee'], {restore: true, passthrough: false});

// Converts .coffee files to .js then concatenates and minifies
gulp.task('scripts', function() {
    return gulp.src(source.js)
        .pipe(plumber())
        .pipe(coffeeFilter)
        .pipe(coffee({bare: true}).on('error', util.log))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(assets.js));
});

// ----- ----- ----- ----- SASS ----- ----- ----- -----
var sassOptions = {outputStyle: 'compressed'};
var autoprefixOptions = {browsers: ['last 2 versions', '> 5%', 'Firefox ESR']};

// Converts all .scss to .css
gulp.task('styles', function() {
  	return gulp.src(source.style)
	    .pipe(sourcemaps.init())
	    .pipe(sass(sassOptions).on('error', sass.logError))
	    .pipe(autoprefix(autoprefixOptions))
	    .pipe(sourcemaps.write())
	    .pipe(rename('style.min.css'))
	    .pipe(gulp.dest(assets.css))
	    .pipe(notify({message: 'Styles Processed!', onLast: true}));
});

// CSS Remover
gulp.task('uncss', function() {
	return gulp.src(source.style)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefix(autoprefixOptions))
		.pipe(rename("style.min.css"))
		.pipe(uncss({ html: ['*.html'] }))
		.pipe(minifyCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(assets.css))
		.pipe(notify({message: 'CSS Trimmed!', onLast: true}));
});

// ----- ----- ----- ----- Images ----- ----- ----- -----
// Compresses image files
gulp.task('images', function() {
    return gulp.src(source.img)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(assets.img))
        .pipe(notify({message: 'Images Optimized!', onLast: true}));
});

// ----- ----- ----- ----- Jade File Management ----- ----- ----- -----
var jadeOptions = {pretty: true};

// Converts all .jade to .html and builds to respective folders
gulp.task('jade', function() {
    gulp.start('jade-root', 'jade-page', 'jade-post','jade-game');
});

// Converts index and 404 .jade into .html and builds to project root folder
gulp.task('jade-root', function() {
    return gulp.src(source.jade.root)
    .pipe(plumber())
    .pipe(jade(jadeOptions))
    .pipe(gulp.dest(''));
});

// Converts subpage .jade files and builds to src file folder name
gulp.task('jade-page', function() {
    return gulp.src(source.jade.page)
    .pipe(plumber())
    .pipe(jade(jadeOptions))
    .pipe(rename(function(path) {
        path.dirname = path.basename;
        path.basename = "index";
        path.extname = ".html"
    }))
    .pipe(gulp.dest(''));
});

// Converts blog post .jade files and builds in blog folder with src file folder name
gulp.task('jade-post', function() {
    return gulp.src(source.jade.post)
    .pipe(plumber())
    .pipe(jade(jadeOptions))
    .pipe(rename(function(path) {
        path.dirname = path.basename;
        path.basename = "index";
        path.extname = ".html"
    }))
    .pipe(gulp.dest(assets.html.blog));
});

// Converts game .jade files and builds in games folder with src file folder name
gulp.task('jade-game', function() {
    return gulp.src(source.jade.game)
    .pipe(plumber())
    .pipe(jade(jadeOptions))
    .pipe(rename(function(path) {
        path.dirname = path.basename;
        path.basename = "index";
        path.extname = ".html"
    }))
    .pipe(gulp.dest(assets.html.game));
});