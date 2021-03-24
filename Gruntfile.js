module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            target: {
                tasks: ['watch:autoprefixer', 'watch:cssmin_prefixedAndMinified', 'watch:jshint'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        autoprefixer: {
            options: {
                // Task-specific options go here.
                browsers: ['last 2 versions']
            },
            dist: {
                // Target-specific file lists and/or options go here.
                src: 'css/style.css',
                dest: 'css/prefixed.css'
            }
        },
        watch: {
            autoprefixer: {
                files: 'css/style.css',
                tasks: ['autoprefixer']
            },
            cssmin_prefixedAndMinified: {
                files: 'css/prefixed.css',
                tasks: ['cssmin']
            },
            jscompressor: {
                files: 'js/*.js',
                tasks: ['uglify']
            },
            jshint: {
                files: ['js/**/*.js', '!js/output.min.js'],
                tasks: ['jshint']
            }

        },
        cssmin: {
            target: {
                files: {
                    'css/mainAndNormalize.min.css': ['css/normalize.css', 'css/main.css'],
                    'css/prefixedAndMinified.min.css': ['css/prefixed.css']
                },
            }
        },
        uglify: {
            target: {
                files: {
                    'js/output.min.js': ['js/main.js', 'js/plugins.js'],
                },
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expend: true,
                    cwd: "img/",
                    src: ["**/*.{jpg,png,gif}", "!build/**/*.{jpg,png,gif}"],
                    dest: 'img/build'

                }]
            }
        },
        jshint: {
            options: {

                "bitwise": true,
                "camelcase": true,
                "curly": true,
                "latedef": true,
                "newcap": true,
                "nonew": true,
                "undef": true,
                "unused": true,
                "esnext": true,

                "sub": true,
                "browser": true,
                "node": true,
                "jquery": true,
                "devel": true,
                "strict": true
            },
            target: {
                src: ['js/**/*.js', '!js/output.min.js']
            }
        }





    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask("default", ["autoprefixer", "watch"]);
    grunt.registerTask('minifyNewImages', ['newer:imagemin']);
};