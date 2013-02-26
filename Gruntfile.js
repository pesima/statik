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
          '<%= dir.dest %>/assets/css/bootstrap.min.css': [ '<%= dir.dest %>/assets/less/bootstrap.less' ]
        }
      }
    },
    
    concat: {
      dev: {
        bootstrap: {
          '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap.js': [ 
            '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-transition.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-alert.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-button.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-carousel.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-collapse.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-dropdown.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-modal.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-tooltip.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-popover.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-scrollspy.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-tab.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-typeahead.js', 
              '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap-affix.js'
          ]
        },
        app: {
          '<%= dir.dest %>assets/js/app.js': [ 
            '<%= dir.dest %>/assets/js/vendor/holder.js',
            '<%= dir.dest %>/assets/js/vendor/mustache/mustache.js',
            '<%= dir.dest %>/assets/js/vendor/mustache/jquery.mustache.js'
           ]
        }
      },
      
      prod: {
        '<%= dir.dest %>/assets/js/main.js': [ 
          '<%= dir.dest %>/assets/js/copyright.js',
          '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap.js',
          '<%= dir.dest %>assets/js/app.js'
        ]
      }
    },
    
    uglify: {
      dist: {
        files: {
          '<%= dir.dest %>/assets/js/scripts.min.js': [
            '<%= dir.dest %>/assets/js/vendor/bootstrap/bootstrap.js',
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'copy',
    'recess',
    'concat',
    'uglify',
    'version'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
