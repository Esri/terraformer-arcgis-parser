var fs = require('fs');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! Terraformer ArcGIS Parser - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '*   https://github.com/esri/terraformer-arcgis-parser\n' +
        '*   Copyright (c) 2013-<%= grunt.template.today("yyyy") %> Esri, Inc.\n' +
        '*   Licensed MIT */'
    },

    uglify: {
      options: {
        report: 'gzip',
        banner: '<%= meta.banner %>'
      },
      arcgis: {
        src: ["terraformer-arcgis-parser.js"],
        dest: 'terraformer-arcgis-parser.min.js'
      }
    },

    jasmine: {
      coverage: {
        src: [
          "terraformer-arcgis-parser.js"
        ],
        options: {
          specs: 'spec/*Spec.js',
          helpers:[
            "node_modules/terraformer/terraformer.js"
          ],
          //keepRunner: true,
          outfile: 'SpecRunner.html',
          // template: require('grunt-template-jasmine-istanbul'),
          // templateOptions: {
          //   coverage: './coverage/coverage.json',
          //   report: './coverage',
          //   thresholds: {
          //     lines: 80,
          //     statements: 80,
          //     branches: 75,
          //     functions: 80
          //   }
          // }
        }
      }
    },

    complexity: {
      generic: {
        src: [ 'terraformer-arcgis-parser.js' ],
        options: {
          jsLintXML: 'complexity.xml', // create XML JSLint-like report
          errorsOnly: false, // show only maintainability errors
          cyclomatic: 6,
          halstead: 15,
          maintainability: 65
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-complexity');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('version', ['test', 'uglify']);
  grunt.registerTask('default', ['test']);
};