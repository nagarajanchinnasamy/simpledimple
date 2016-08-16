/*global expect, describe, it, beforeEach, d3, dimple*/
define(["simpledimple"], function (simpledimple) {
    "use strict";

    var chartConfig, data;

    chartConfig = {
        "width": 590,
        "height": 400,
        "bounds": {
            "x": 70,
            "y": 30,
            "width": 505,
            "height": 305
        },
        "axes": [
            {
                "position": "x",
                "categoryFields": "Month",
                "orderRules": [{"ordering": "Date"}]
            },
            {
                "position": "y",
                "measure": "Unit Sales"
            }
        ],
        "series": [
            {
                "plot": "area",
                "interpolation": "step",
                "lineWeight": 1
            }
        ]
    };

    data = [
        {
            "Month": "Jan-11",
            "Unit Sales": "1765"
        },
        {
            "Month": "Jan-11",
            "Unit Sales": "673"
        }
    ];

    describe("newChart", function () {

        beforeEach(function () {
            d3.select("body").append("div").attr("id", "itDiv");
        });

        it("should add by tag", function () {
            var svg;
            simpledimple.newChart("body", chartConfig, data);
            svg = document.getElementsByTagName("svg");
            expect(svg.length).toEqual(1);
            expect(document.getElementsByTagName("svg")[0].parentNode.tagName).toEqual("BODY");
            expect(parseInt(d3.select(svg[0]).attr("width"), 10)).toEqual(chartConfig.width);
            expect(parseInt(d3.select(svg[0]).attr("height"), 10)).toEqual(chartConfig.height);
            d3.select(svg[0]).remove();
            expect(svg.length).toEqual(0);
        });

        it("should add by id", function () {
            var svg;
            simpledimple.newChart("#itDiv", chartConfig, data);
            svg = document.getElementsByTagName("svg");
            expect(svg.length).toEqual(1);
            expect(document.getElementsByTagName("svg")[0].parentNode.tagName).toEqual("DIV");
            expect(parseInt(d3.select(svg[0]).attr("width"), 10)).toEqual(chartConfig.width);
            expect(parseInt(d3.select(svg[0]).attr("height"), 10)).toEqual(chartConfig.height);
            d3.select(svg[0]).remove();
        });

        it("should add by default parameter", function () {
            var svg;
            simpledimple.newChart(null, chartConfig, data);
            svg = document.getElementsByTagName("svg");
            expect(svg.length).toEqual(1);
            expect(document.getElementsByTagName("svg")[0].parentNode.tagName).toEqual("BODY");
            expect(parseInt(d3.select(svg[0]).attr("width"), 10)).toEqual(chartConfig.width);
            expect(parseInt(d3.select(svg[0]).attr("height"), 10)).toEqual(chartConfig.height);
            d3.select(svg[0]).remove();
        });

        it("should check selection exceptions", function () {
            var svg, random;
            random = function () {
                simpledimple.newChart("random string", chartConfig, data);
            };
            expect(random).toThrow("The 'random string' selector did not match any elements.  Please prefix with '#' to select by id or '.' to select by class");
            svg = document.getElementsByTagName("svg");
            expect(svg.length).toEqual(0);
        });
    });
});
