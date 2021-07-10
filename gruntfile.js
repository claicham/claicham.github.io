const Fiber = require('fibers');
const sass = require('sass');

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    postcss: {
      prefixer: {
        options: {
            map: false,
            processors: [
                require('autoprefixer')({ supports: false })
            ]
        },
        src: [
            '*.css'
        ]
      },
    },

    sass: {
      // generic options
      options: {
        sourceMap: true,
        outputStyle: 'compressed',
        linefeed: 'crlf',
        fiber: Fiber,
        implementation: sass,
      },
      dist: {
        files: {
          'claicham.css': 'scss/claicham.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:dist'],
        options: {
          spawn: false,
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  // icons
  grunt.registerTask('scss', ['sass:dist', 'postcss:prefixer']);
  grunt.registerTask('default', ['sass:dist', 'watch:sass', 'postcss:prefixer']);
};
