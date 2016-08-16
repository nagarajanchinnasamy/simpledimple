/*global expect, describe, it, beforeEach, runs, waitsFor, require, d3, dimple, simpledimple */
(function () {
    "use strict";

    describe("using RequireJS with simpledimple", function () {
        describe("when requiring the module", function () {
            it("returns a valid simpledimple object", function (done) {
                require(["simpledimple"], function (simpledimple) {
                    expect(simpledimple).toBeDefined();
                    expect(simpledimple.version).toBeDefined();
                    done();
                });
            });
        });
    });
}());
