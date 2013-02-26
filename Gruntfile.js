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
          '<%= dir.dest %>/assets/css/main.min.css': [ '<%= dir.dest %>/assets/js/bootstrap/less/bootstrap.less' ]
        }
      }
    },
    
    uglify: {
      dist: {
        files: {
          '<%= dir.dest %>/assets/js/scripts.min.js': [
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-transition.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-alert.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-button.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-carousel.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-collapse.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-dropdown.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-modla.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-tooltip.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-popover.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-scrollspy.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-tab.js',
            '<%= dir.dest %>/assets/js/bootstrap/bootstrap-typehead.js',
            '<%= dir.dest %>/assets/js/*.js',
            '<%= dir.dest %>/assets/js/_*.js'
          ]
        }
      }
    },
    
    watch: {
      less: {
        files: [ '<%= dir.src %>/assets/js/bootstrap/less/*.less' ],
        tasks: ['copy', 'recess']
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
    'clean',
    'copy',
    'recess',
    'uglify',
    'version'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
