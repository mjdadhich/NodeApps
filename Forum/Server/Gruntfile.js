module.exports = function(grunt) { 
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        env : {
          dev : {
            NODE_ENV : 'development'
          },
        
        },

        nodemon: {
            dev: { script: 'index.js' }
        },
            
    
    });

    grunt.loadNpmTasks('grunt-contrib-nodemon');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('default',  [
      'env:dev',
      'nodemon'
    ]);
   

};