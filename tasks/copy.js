/**
 * Task: copy
 * Description: Copy 'src' to 'dest'
 */

module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('copy', function(s, d) {
        var fs = require('fs');
        var path = require('path');
        var srcDir = grunt.template.process(grunt.config('dir.' + s));
        var tmpDir = grunt.template.process(grunt.config('dir.' + d));
        
        grunt.log.write('Copying file(s) from ' + srcDir + ' to ' + tmpDir + '...');
        // Recursively copy the files in 'src' directory
        grunt.file.recurse(srcDir, function(absDir, rootDir, subDir, filename) {
            grunt.file.copy(absDir, path.join(tmpDir, subDir, filename));
        });
        grunt.log.ok();
    });
};
