'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    dir: {
            src: 'src',
            dest: 'dist'
        },
  
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      
      all: [
        'Gruntfile.js',
        '<%= dir.src %>/assets/js/*.js',
        '<%= dir.src %>/assets/js/*.js',
        '!<%= dir.src %>/assets/js/scripts.min.js'
      ]
    },
    
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          '<%= dir.src %>/assets/css/main.min.css': [ '<%= dir.src %>/less/bootstrap.less' ]
        }
      }
    },
    
    uglify: {
      dist: {
        files: {
          '<%= dir.src %>/assets/js/scripts.min.js': [
            '<%= dir.src %>/vendor/bootstrap/bootstrap-transition.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-alert.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-button.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-carousel.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-collapse.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-dropdown.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-modla.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-tooltip.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-popover.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-scrollspy.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-tab.js',
            '<%= dir.src %>/vendor/bootstrap/bootstrap-typehead.js',
            '<%= dir.src %>/assets/js/*.js',
            '<%= dir.src %>/assets/js/_*.js'
          ]
        }
      }
    },
    
    watch: {
      less: {
        files: [ '<%= dir.src %>/less/*.less' ],
        tasks: ['recess']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint']
      }
    },
    
    clean: {
      dist: [ '<%= dir.dest %>' ]
    }

    
  });

  // Load tasks
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  // Register tasks
  grunt.registerTask('default', [
    'clean:dist',
    'copy:src:dest',
    'recess',
    'uglify',
    'version',
    'copy:dest:dest',
    'clean:dest'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
