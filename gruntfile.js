module.exports = function (grunt) {

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
        src: 'source/input-mode.js',
        dest: 'dist/input-mode.min.js'
      }
    },

    // Other files, eg. images
    copy: {
      dist: {
        files: [
          { 
            expand: true, 
            flatten: true, 
            src: ['source/input-mode.js'], 
            dest: 'dist/', 
            filter: 'isFile'
          }
        ]
      }
    },

    // Clean things up
    clean: ['dist/']

  });

  grunt.registerTask('default', ['prod']);
  grunt.registerTask('prod', ['clean','uglify','copy']);

}