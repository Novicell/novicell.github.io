'use strict';

var notifier = require('node-notifier');
var argv = require('yargs').argv;
var path = require('path');

module.exports = (function () {
    var projectPath = "./"; // path for the source files
    var webPath = projectPath + ""; // path for the website - usually path to livereload views, and used for distPath
    var vendorPath = projectPath + "node_modules/"; // path for vendor scripts
    var distPath = webPath + "dist/"; // path for production files
    var cleanPaths = [distPath]; // files/folders to be removed with "clean"-task

    return {
        // ------------- Bundles -------------
        bundles: [
            {
                name: 'master',
                scripts: [
                    vendorPath + "angular/angular.js",
                    projectPath + "scripts/angular/**/*.js"
                ],
                styles: [ projectPath + "less/master.less" ],
                images: [ projectPath + "images/**/*.{jpg,png,svg,gif}"],
                html: [ projectPath + "html/*.html" ]
            },
            {
                name: "icons",
                icons: [ projectPath + "icons/**/*.svg" ]
            }
        ],


        // ------------- Styles -------------
        stylesDist: distPath + "css",

        // ------------- Scripts -------------
        scriptsDist: distPath + "scripts",

        // ------------- Icons ---------------
        iconsDist: distPath + "icons/",

        // ------------- Fonts -------------
        fontsDist: distPath + "fonts",

        // ------------- Images -------------
        imagesDist: distPath + "images",
        imagesOptimizationLevel: 5,
        imagesProgressive: true,
        imagesInterlaced: true,

        // -------------- HTML --------------
        htmlFileIncludeConfig: {
            prefix: '@@',
            basepath: '@file'
        },

        // ------------- Livereload ---------
        livereloadPort: 35729,
        livereloadPaths: [
            distPath + "**/*.*",
            webPath + "Views/**/*.cshtml",
            webPath + "html/**/*.html",
            webPath + "**/*.php"
        ],

        // ------------- Watch -------------
        watchImages: [ projectPath + 'images/**/*' ],
        watchIcons: [ projectPath + 'icons/*' ],
        watchFonts: [ projectPath + 'fonts/*' ],
        watchHtml: [ projectPath + 'html/**/*' ],
        watchScripts: [
            projectPath + 'scripts/**/*.js'
        ],
        watchStyles: [
            projectPath + 'less/**/*.less'
        ],

        // ------------- Deploy task --------
        deployHost: "",
        deployUser: "",
        deployPass: "",
        deployDest: "/public_html/",
        deployGlobs: [ distPath + '**' ],

        // ------------- Copy on build --------
        buildCopy: [{
            from: projectPath + "fonts/**/*",
            to: distPath  + "fonts"
        }],


        // ------------- Tasks -------------
        loadTasks: [
            "styles", "scripts", "images", "icons", "watch", "build"
        ],
        buildTasks: [
            "styles", "scripts", "images", "icons"
        ],

        // ------------- Return Paths -------------
        projectPath: projectPath,
        vendorPath: vendorPath,
        cleanPaths: cleanPaths,
        distPath: distPath,

        // ---------- Errorhandler ------
        errorHandler: function(taskName)
        {
            return function (e) {
                notifier.notify({
                    'title': taskName,
                    'message': 'An error occured in the ' + e.plugin + ' plugin.'
                });
                console.log(e.message);
                this.emit('end');
            };
        }
    }
})();
