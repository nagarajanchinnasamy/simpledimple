module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    "src/begin.js",
                    "src/objects/chart/begin.js",
                    "src/objects/chart/methods/*.js",
                    "src/objects/chart/end.js",
                    "src/methods/*.js",
                    "src/end.js"
                ],
                dest: 'dist/<%= pkg.name %>.v<%= pkg.version %>.js'
            },
            test: {
                src: '<%= concat.dist.src %>',
                dest: 'tmp/<%= pkg.name %>.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.v<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy: {
            main: {
                files: [
                    { src: 'dist/<%= pkg.name %>.v<%= pkg.version %>.min.js', dest: 'dist/<%= pkg.name %>.latest.min.js'},
                    { src: 'dist/<%= pkg.name %>.v<%= pkg.version %>.js', dest: 'dist/<%= pkg.name %>.latest.js'}
                ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 3001,
                    base: '.'
                }
            }
        },
        jslint: {
            all: {
                options: {
                    edition: 'latest', // specify an edition of jslint or use 'dir/mycustom-jslint.js' for own path
                    errorsOnly: true, // only display errors
                    failOnError: false, // defaults to true
                    checkstyle: 'tmp/lint-checkstyle.xml' // write a checkstyle-XML
                },
                src: [
                    'Gruntfile.js',
                    'test/**/*.spec.js',
                    'dist/<%= pkg.name %>.v<%= pkg.version %>.js'
                ],
                directives: {
                    browser: true,
                    nomen: true,
                    plusplus: true,
                    predef: [
                        'd3',
                        'dimple',
                        'module',
                        'console',
                        'jasmine',
                        'simpledimple',
                        'module',
                        'define',
                        'require',
                        'exports',
                        'describe',
                        'it',
                        'xdescribe',
                        'xit',
                        'beforeEach',
                        'afterEach'
                    ]
                }
            }
        },
        prop: {
            dist: {
                src: [
                    'examples/templates/*.html'
                ]
            },
            options: {
                exampleOutputPath: 'examples/',
                libPath: '/lib/',
                distPath: '/dist/',
                version: 'v<%= pkg.version %>',
                d3version: 'v<%= pkg.dependencies.d3 %>',
                dimpleversion: 'v<%= pkg.dependencies.dimple %>',
                scriptTag: '{scriptDependencies}',
                header: "<!----------------------------------------------------------------->\n" +
                        "<!-- AUTOMATICALLY GENERATED CODE - PLEASE EDIT TEMPLATE INSTEAD -->\n" +
                        "<!----------------------------------------------------------------->\n"
            }
        },
        karma: {
            options: {
                basepath: '',
                frameworks: ['jasmine', 'requirejs'],
                files: [
                    'test/test-main.js',
                    { pattern: 'lib/**/*.min.js', included: false },
                    { pattern: 'tmp/*.js', included: false },
                    { pattern: 'test/**/*.spec.js', included: false }
                ],
                reporters: ['progress'],
                port: 9876,
                colors: true,
                browsers: ['PhantomJS']
            },
            unit: {
                singleRun: true
            },
            continuous: {
                background: true
            }
        },
        watch: {
            src: {
                files: [
                    '<%= concat.test.src %>'
                ],
                tasks: ['concat:test', 'karma:continuous:run']
            },
            test: {
                files: [
                    'test/**/*.spec.js',
                    'test/*.spec.js'
                ],
                tasks: ['karma:continuous:run']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    // Propogate version into relevant files
    grunt.registerMultiTask('prop', 'Propagate Versions.', function () {
        function generateScriptElements(options, indent) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>> generateScriptElements <<<<<<<<<<<<<<<<<<<<<<<<<");
            var d3Path = "{libFolder}/d3/d3.{d3version}.js",
                dimplePath = "{libFolder}/dimple/dimple.{dimpleversion}.js",
                simpledimplePath = "{distFolder}simpledimple.{version}.js",
                createScriptElement = function (path) {
                    var scriptElement = '<script src="{path}"></script>';
                    return scriptElement.split("{path}").join(path);
                },
                libPath = options.libPath,
                distPath = options.distPath,
                version = options.version,
                d3version = options.d3version,
                dimpleversion = options.dimpleversion,
                tab = "",
                i;

            // default indentation to two spaces
            indent = indent || 2;

            for (i = 0; i < indent; i++) {
                tab += " ";
            }

            d3Path = d3Path.split("{libFolder}").join(libPath);
            d3Path = d3Path.split("{d3version}").join(d3version);
            dimplePath = dimplePath.split("{libFolder}").join(libPath);
            dimplePath = dimplePath.split("{dimpleversion}").join(dimpleversion);
            simpledimplePath = simpledimplePath.split("{distFolder}").join(distPath);
            simpledimplePath = simpledimplePath.split("{version}").join(version);

            grunt.log.writeln("\nUsing d3: " + d3Path + " with " + d3version);
            grunt.log.writeln("\nUsing dimple: " + dimplePath + " with " + dimpleversion);
            grunt.log.writeln("\nUsing simpledimple: " + simpledimplePath + " with " + version + "\n");

            return createScriptElement(d3Path) + "\n" + tab + createScriptElement(dimplePath) + "\n" + tab + createScriptElement(simpledimplePath);
        }

        var options, outPath, header, scriptTag, scripts;
        options = this.options();
        console.log(">>>>>>>>>>>>>>>>>>>>>>>> options() <<<<<<<<<<<<<<<<<<<<<<<<<");
        outPath = options.exampleOutputPath;
        header = options.header;
        scriptTag = options.scriptTag;
        scripts = generateScriptElements(options);

        this.files.forEach(function (f) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>> forEach <<<<<<<<<<<<<<<<<<<<<<<<<");
            f.src.filter(function (filepath) {
                var result = true;
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('File "' + filepath + '" not found.');
                    result = false;
                }
                return result;
            }).map(function (filepath) {
                console.log(">>>>>>>>>>>>>>>>>>>>>>>> map <<<<<<<<<<<<<<<<<<<<<<<<<");
                // Read file source.
                var src = grunt.file.read(filepath);

                // Replace the script placeholder tag with script html elements
                src = src.split(scriptTag).join(scripts);

                // Write the new file
                grunt.log.writeln("Creating " + outPath + filepath.substring(filepath.lastIndexOf("/") + 1));
                grunt.file.write(outPath + filepath.substring(filepath.lastIndexOf("/") + 1), header + src);
            });
        });
    });

    // Default tasks
    grunt.registerTask('default', ['concat', 'jslint', 'uglify', 'copy', 'connect', 'prop']);
    grunt.registerTask('test:unit', ['concat:test', 'karma:unit']);
    grunt.registerTask('test', ['karma:continuous:start', 'watch']);

};
