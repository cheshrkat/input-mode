module.exports = function (grunt) {

  var sourceFile = 'source/input-mode.js';

  // JIT avoids the need to specify every plugin
  // and speeds things up quite a bit
  require('jit-grunt')(grunt);

  // Gives a nice readout on how long things are taking
  require('time-grunt')(grunt);
 
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JavaScript
    uglify: {
      options: {
        banner: '/*! Input Mode v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %>. MIT license. github.com/cheshrkat/input-mode */\n',
        preserveComments: function(node, comment) {
          return /^!|@preserve|@license|@cc_on/i.test(comment.value);
        },
        mangle: true
      },
      build: {
        src: sourceFile,
        dest: 'dist/input-mode.min.js'
      }
    },

    // Other files, eg. images
    copy: {
      dist: {
        files: [
          { src: sourceFile, dest: 'docs/', expand: true, flatten: true, filter: 'isFile' }
        ]
      }
    },

    // Clean things up
    clean: ['dist/']

  });

  grunt.registerTask('default', ['prod']);
  grunt.registerTask('prod', ['clean','uglify','copy']);

}