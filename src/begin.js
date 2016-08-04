// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/simpledimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/begin.js

// Wrap all application code in a self-executing function which handles optional AMD/CommonJS publishing
(function (context, simpledimple) {
    "use strict";

    if (typeof exports === "object") {
        // CommonJS
        console.log(">>>>>>>>>>>>>>>>>>>>CommonJS<<<<<<<<<<<<<<<<<<<<<");
        module.exports = simpledimple(require('d3'), require('dimple'));
    } else {
        if (typeof define === "function" && define.amd) {
            // RequireJS | AMD
            define(["d3", "dimple"], function (d3, dimple) {
                // publish simpledimple to the global namespace for backwards compatibility
                // and define it as an AMD module
                context.simpledimple = simpledimple(d3, dimple);
                return context.simpledimple;
            });
        } else {
            // No AMD, expect d3 to exist in the current context and publish
            // simpledimple to the global namespace
            if (!context.d3) {
                if (console && console.warn) {
                    console.warn("simpledimple requires d3 to run.  Are you missing a reference to the d3 library?");
                } else {
                    throw "simpledimple requires d3 to run.  Are you missing a reference to the d3 library?";
                }
            } else if (!context.dimple) {
                if (console && console.warn) {
                    console.warn("simpledimple requires dimple to run.  Are you missing a reference to the dimple library?");
                } else {
                    throw "simpledimple requires dimple to run.  Are you missing a reference to the dimple library?";
                }
            } else {
                context.simpledimple = simpledimple(context.d3, context.dimple);
            }
        }
    }

}(this, function (d3, dimple) {
    "use strict";
    /*jslint unparam: true*/

    // Create the stub object
    var simpledimple = {
        version: "1.0.0"
    };
