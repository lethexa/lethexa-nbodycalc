/* global module */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            dist: {
                src: ['lib/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        yuidoc: {
            all: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
		url: '<%= pkg.homepage %>',
                options: {
		    exclude: 'build,dist,doc',
                    paths: ['./', 'lib/'],
                    outdir: 'doc/'
                }
            }
        },
        jshint: {
            all: ['dist/<%= pkg.name %>.js']
        },
        
        mochacli: {
          options: {
            reporter: "nyan",
            ui: "tdd"
          },
          all: ["test/tests.js"]
        },        
        
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Copyright by <%= pkg.author.name %> <%= pkg.author.email %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks("grunt-mocha-cli");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('test', ['mochacli']);
    grunt.registerTask('jenkins', ['concat', 'jshint', 'mochacli', 'yuidoc', 'uglify']);
    grunt.registerTask('default', ['concat', 'jshint', 'mochacli', 'yuidoc', 'uglify']);
};
