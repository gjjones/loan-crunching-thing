var browserSync = require('browser-sync');

module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: ['public/scripts/**/*.js'],
                tasks: ['browserify', 'bs-inject']
            },
            styles: {
                files: ['public/styles/**/*.less'],
                tasks: ['less', 'bs-inject']
            }
        },
        
        less: {
            default: {
                files: {
                    'build/all.css': 'public/styles/all.less',
                }
            },
            ie: {
                files: {
                    'build/all.ie.css': 'public/styles/all.less',
                },
                options: {
                    modifyVars: {
                        'fix-mqs': '500px',
                        'old-ie': true
                    }
                }
            },
            test: {
                files: {
                    'build/test.less': 'public/styles/all.less',
                },
                options: {
                }
            }
        },

        browserify: {
            default: {
                options: {
                    browserifyOptions: {
                        debug: true,
                    }
                },
                files: {
                    'build/bundle.js': ['public/scripts/**/*.js']
                }
            }
        }
    });

    grunt.registerTask('bs-init', function() {
        var done = this.async();
        browserSync({
            server: '.'
        }, function(err, bs) {
            done();
        });
    });

    grunt.registerTask('bs-inject', function() {
        browserSync.reload(['build/bundle.js', 'build/all.css']);
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['less', 'browserify', 'bs-init', 'watch']);
};
