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

                "bitwise": true, //niemożność używania operatorów & i | - są rzadko używane, a często ktoś się myli
                "camelcase": true, //albo nazywasz zmienne takiSposob albo TAKI_SPOSOB, ale nie np. taki_sposob
                "curly": true, //wymagany curly bracer po pętli            
                "latedef": true, //nie można użyć zmiennej zanim się jej nie zdefinuje
                "newcap": true, //wymaganie pierwszej duzej litery w konstruktorach            
                "nonew": true, //nie można stworzyć konstruktora bez przypisania go do niczego            
                "undef": true, //nie można użyć niezdefiniowanej zmiennej
                "unused": true, //informuje o tym, że stworzyliśmy zmienną, ale nie użyliśmy jej           
                "esnext": true, //piszemy zgodnie z najnowszą specyfikacją    

                "sub": true, //nie wyrzuca ostrzeżenia dla person['name'] twierdzi, że lepiej jest napisać: person.name.
                "browser": true, //dzięki temu nie wyrzuca błędów dla globalnych zmiennych
                "node": true, //można bez problemu korzystać z node
                "jquery": true, //j/w ale z jquery
                "devel": true, //alert nie wyrzuca ostrzeżenia           
                "strict": true // - pisanie w strict mode, jak się zrobi pewnego rodzaju "ciche" błędy to program normalnie, działa, z tym nie      
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