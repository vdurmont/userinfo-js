module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    concat: {
      options: {
        separator: ";"
      },
      app_js: {
        src: ["src/userinfo.js"],
        dest: "dist/tmp.js"
      },
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: "/*! <%= pkg.name %> <%= pkg.version %> [<%= grunt.template.today('dd-mm-yyyy') %>] */\n",
        mangle: true
      },
      dist: {
        files: {
          "dist/<%= pkg.name %>.min.js": ["<%= concat.app_js.dest %>"]
        }
      }
    },

    jshint: {
      files: ["src/*.js"],
      options: {
        globals: {
          console: true,
          module: true,
          smarttabs: false,
          angular: false
        }
      }
    },
    clean: {
      tmp: { src: ["dist/tmp.js"] },
      all: { src: ["dist/**"] }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("default", ["clean:all", "jshint", "concat", "uglify", "clean:tmp"]);
};
