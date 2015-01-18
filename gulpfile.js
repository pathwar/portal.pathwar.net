var bowerFiles  = require('main-bower-files');
var es          = require('event-stream');
var gulp        = require("gulp");
var plugins     = require('gulp-load-plugins')();
var historyApiFallback = require('connect-history-api-fallback');
var del         = require('del');
var through2    = require('through2');

var env = process.env.NODE_ENV;

gulp.task('clean', function(cb) {
  del([
    './build/**'
  ], cb);
});

gulp.task("templates", function() {

  return gulp.src(["app/**/*.jade", '!app/index.jade'])
    .pipe(plugins.jade())
    .pipe(plugins.angularTemplatecache({
      standalone: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(plugins.connect.reload());

});

gulp.task("config", function() {

  function alterConfig() {
    return through2.obj(function(file, enc, next) {

      var config = JSON.parse(file.contents.toString());

      if (process.env.API_ENDPOINT) {
        config.ApiConfig.endpoint = process.env.API_ENDPOINT;
      }

      else if (process.env.API_PORT_5000_TCP_PORT) {
        config.ApiConfig.endpoint = null;
        config.ApiConfig.port = process.env.API_PORT_5000_TCP_PORT;
      }

      file.contents = new Buffer(JSON.stringify(config));

      next(null ,file);
    })
  }

  return gulp.src("config.json")
  .pipe(alterConfig())
  .pipe(plugins.ngConstant({
    name: 'portal.config'
  }))
  .pipe(gulp.dest('./build'))
  .pipe(plugins.connect.reload());

});

gulp.task("scripts", function() {

  return gulp.src("app/**/*.js")
    .pipe(plugins.plumber())
    .pipe(plugins.using({prefix: 'Compiling JS'}))
    .pipe(plugins['6to5']())
    .pipe(plugins.if(env == 'production', plugins.ngAnnotate()))
    .pipe(plugins.if(env == 'production', plugins.concat('app.js')))
    .pipe(plugins.if(env == 'production', plugins.uglify()))
    //.pipe(                                plugins.rev())

    .pipe(gulp.dest("./build/"))
    .pipe(plugins.connect.reload());

});

gulp.task("styles", function() {

  return gulp.src('app/**/*.styl')
    .pipe(plugins.plumber())
    .pipe(plugins.using({prefix: 'Compiling CSS'}))
    .pipe(plugins.stylus())
    .pipe(plugins.if(env == 'production', plugins.concat('app.css')))
    .pipe(plugins.if(env == 'production', plugins.csso()))
    .pipe(gulp.dest('./build/'))
    .pipe(plugins.connect.reload());

});

gulp.task("vendor-fonts", function() {

  return gulp.src('vendor/font-awesome/fonts/*')
    .pipe(gulp.dest('./build/vendor/fonts/'));

});

gulp.task("vendor-scripts", function() {

  return gulp.src(bowerFiles())
    .pipe(plugins.filter("*.js"))
    .pipe(plugins.if(env == 'production', plugins.ngAnnotate()))
    .pipe(plugins.if(env == 'production', plugins.uglify()))
    .pipe(gulp.dest("./build/vendor/js/"))
    .pipe(plugins.connect.reload());

});


gulp.task("vendor-styles", function() {

  return gulp.src(bowerFiles())
      .pipe(plugins.filter("*.css"))
      .pipe(gulp.dest("./build/vendor/css/"))
      .pipe(plugins.connect.reload());

});

gulp.task("assets", function() {
  return gulp.src(["assets/**/*"])
      .pipe(gulp.dest("./build/assets"));
});

gulp.task("index", function() {

  var vendorJs = es.merge(
    gulp.src(["./build/vendor/js/angular.js"], {read: false}),
    gulp.src(["./build/vendor/*/*.js",
              "./build/vendor/*/*.css",
              "!./build/vendor/js/angular.js"], {read: false})
  );

  return gulp.src("app/index.jade")
    .pipe(
      plugins.inject(vendorJs.pipe(plugins.using({prefix: 'Injecting'})), {
        ignorePath: 'build',
        addRootSlash: false,
        name: 'bower'
      })
    )
    .pipe(
      plugins.inject(gulp.src(['./build/**/*.js', './build/**/*.css', '!./build/vendor/**/*'], {read: false}), {
        ignorePath: 'build',
        addRootSlash: false
      })
    )
    .pipe(plugins.jade({
      locals: {
        env: env,
        BASE_PATH: process.env.BASE_PATH ? process.env.BASE_PATH : '/'
      },
      pretty: env == 'production' ? false : true
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(plugins.connect.reload());

});

gulp.task('connect', function() {

  plugins.connect.server({
    root: 'build',
    middleware: function(connect, opt) {

      return [
        historyApiFallback
      ];
    },
    livereload: {
      port: 0
    },
    host: '0.0.0.0',
    port: 8090
  });

});

gulp.task('build', ['vendor-scripts', 'vendor-styles', 'vendor-fonts', 'assets', 'config', 'templates', 'scripts', 'styles'], function() {
  gulp.start('index');
});

gulp.task('default', ['build', 'connect'], function() {

  gulp.watch("config.json",       ["config"]);
  gulp.watch("app/**/*.styl",     ['styles']);
  gulp.watch("app/**/*.js",       ['scripts']);
  gulp.watch("app/index.jade",    ['index']);
  gulp.watch(["app/**/*.jade", '!app/index.jade'], ['templates']);

});
