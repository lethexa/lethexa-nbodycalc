/* global module */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            all: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
		url: '<%= pkg.homepage %>',
                options: {
		    exclude: 'build,dist,doc',
                    paths: ['lib/'],
                    outdir: 'doc/'
                }
            }
        },
        jshint: {
            all: ['lib/*.js']
        },
        
        mochacli: {
          options: {
            reporter: "list",
            ui: "tdd"
          },
          all: ["test/tests.js"]
        }
    });

    grunt.loadNpmTasks("grunt-mocha-cli");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('test', ['mochacli']);
    grunt.registerTask('jenkins', ['jshint', 'mochacli', 'yuidoc']);
    grunt.registerTask('default', ['jshint', 'mochacli', 'yuidoc']);
};
