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
    var destDir = grunt.config('dir.tmp');
    var desthtml = 'index.html');
    var destCss =  'tmp/assets/css/main.min.css';
    var destJs = 'tmp/assets/js/scripts.min.js';
    
    
    
    // Hash and rename the CSS
    var hashCss = md5(destCss);
    var newCssName = 'assets/css/main-' + hashCss + '.min.css'; 
    fs.renameSync(destCss, newCssName);

    // Hash and rename the JS
    var hashJs = md5(destJs);
    var newJsName = 'assets/js/scripts-' + hashJs + '.min.js';
    fs.renameSync(destJs, newJsName);

    var content = grunt.file.read(destHtml);
    content = content.replace('href="assets/css/main.css"', 'href="' + newCssName + '"');
    content = content.replace('src="assets/js/scripts.js"', 'src="' + newJsName + '"');
    grunt.file.write(destHtml, content);
    grunt.log.writeln('"' + destHtml + '" updated with new CSS/JS versions.');
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
