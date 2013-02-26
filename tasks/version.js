/**
 * Task: version
 * Set the versions in scripts.php for CSS/JS.
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto');

module.exports = function(grunt) {
  grunt.registerTask('version', 'Set the versions in scripts.php for CSS/JS', function() {
    /*
    var destDir = grunt.config('dir.tmp');
    var desthtml = path.join(destDir, 'index.html');
    var destCss = path.join(destDir, 'assets/css/main.min.css');
    var destJs = path.join(destDir, 'assets/js/scripts.min.js');
    */
    var destDir = grunt.config('dir.src');
    var destHtml = path.join(destDir, 'index.html');
    var destCss = path.join(destDir, 'assets/css/main.min.css');
    var destJs = path.join(destDir, 'assets/js/scripts.min.js');
    
    
    grunt.log.writeln(destCss);
    // Hash and rename the CSS
    var hashCss = md5(destCss);
    var newCssName = 'assets/css/main-' + hashCss + '.min.css'; 
    fs.renameSync(destCss, path.join(destDir, newCssName));
    

    // Hash and rename the JS
    var hashJs = md5(destJs);
    var newJsName = 'assets/js/scripts-' + hashJs + '.min.js';
    fs.renameSync(destJs, path.join(destDir, newJsName));

    var content = grunt.file.read('src/index.html');
    content = content.replace('href="assets/css/main.css"', 'href="' + newCssName + '"');
    content = content.replace('src="assets/js/scripts.js"', 'src="' + newJsName + '"');
    grunt.file.write('src/index.html', content);

    grunt.log.writeln('src/index.html updated with new CSS/JS versions.');
  });

  /**
   * 'md5' is a basic wrapper around crypto.createHash
   */
  var md5 = function(filepath) {
    var hash = crypto.createHash('md5');
    hash.update(fs.readFileSync(filepath));
    grunt.log.write('Versioning ' + filepath + '...').ok();
    return hash.digest('hex');
  };
};
