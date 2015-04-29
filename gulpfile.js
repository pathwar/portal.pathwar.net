var bowerFiles  = require('main-bower-files');
var es          = require('event-stream');
var gulp        = require("gulp");
var plugins     = require('gulp-load-plugins')();
var historyApiFallback = require('connect-history-api-fallback');
var del         = require('del');
var through2    = require('through2');
var rev         = require('git-rev');

var env = process.env.NODE_ENV;

gulp.task('clean', function(cb) {
  del([
    './build/**'
  ], cb);
});

gulp.task("templates", function() {

  return gulp.src(["app/**/*.jade", '!app/index.jade'])
    .pipe(plugins.plumber())
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
      if (process.env.NO_PUSHSTATE) {
        config.ApiConfig.html5Mode = false;
      } else {
        config.ApiConfig.html5Mode = true;
      }

      //Dirty to do this here like this ...
      rev.long(function(str) {

        config.PortalConfig = {
          version: str
        };

        file.contents = new Buffer(JSON.stringify(config));

        next(null ,file);
      });
    });
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
    .pipe(plugins.changed('./build/'))
    .pipe(plugins.using({prefix: 'Compiling JS'}))
    .pipe(plugins['6to5']())
    .pipe(plugins.if(env == 'production', plugins.ngAnnotate()))
    .pipe(plugins.angularFilesort())
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

gulp.task("icons", function() {
  return gulp.src(['assets/icons/*.svg'])
    .pipe(plugins.svgSprite({
      mode: {
          defs: true
      }
    }))
    .pipe(gulp.dest('assets/icons'));
});

gulp.task("assets", ['icons'], function() {
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

  var appJs = gulp.src(['./build/**/*.js', '!./build/vendor/**/*']).pipe(plugins.angularFilesort());
  var appCss = gulp.src(['./build/**/*.css', '!./build/vendor/**/*'], {read: false});

  return gulp.src("app/index.jade")
    .pipe(
      plugins.inject(vendorJs.pipe(plugins.using({prefix: 'Injecting'})), {
        ignorePath: 'build',
        addRootSlash: false,
        name: 'bower'
      })
    )
    .pipe(
      plugins.inject(es.merge(appJs, appCss), {
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

  var options = {
    interval: 500
  };

  gulp.watch(["app/**/*.jade",  '!app/index.jade'], options, ['templates']);

  gulp.watch("config.json",     options, ["config"]);
  gulp.watch("app/**/*.styl",   options, ['styles']);
  gulp.watch("app/**/*.js",     options, ['scripts']);
  gulp.watch("app/index.jade",  options, ['index']);

});
