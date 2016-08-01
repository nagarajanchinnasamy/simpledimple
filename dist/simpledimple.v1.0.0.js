// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/simpledimple/blob/master/MIT-LICENSE.txt"
// Source: /src/objects/begin.js

// Wrap all application code in a self-executing function which handles optional AMD/CommonJS publishing
(function (context, simpledimple) {
    "use strict";

    if (typeof exports === "object") {
        // CommonJS
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
                context.simpledimple = simpledimple(context.d3);
            }
        }
    }

}(this, function (d3, dimple) {
    "use strict";
    /*jslint unparam: true*/

    // Create the stub object
    var simpledimple = {
        version: "1.0.0",
        plot: {},
        aggregateMethod: {}
    };

    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
    // Source: /src/objects/chart/begin.js
    // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart
    simpledimple.chart = function (parentSelector, chartConfig, data) {
        var bounds, noFormats, i, n, axis, series, legend, aClass, colors, color, margins;

        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-svg
        this.svg = dimple.newSvg(parentSelector, chartConfig.width, chartConfig.height);
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart
        this.chart = new dimple.chart(this.svg, data);
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-setBounds
        bounds = chartConfig.bounds;
        if (bounds) {
            this.chart.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-data
        this.data = data;
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-noFormats
        noFormats = chartConfig.noFormats;
        if (noFormats !== null && noFormats !== undefined) {
            this.chart.noFormats = noFormats;
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-axes
        this.axes = [];
        if (chartConfig.axes && chartConfig.axes.length) {
            n = chartConfig.axes.length;
            for (i = 0; i < n; i++) {
                axis = this.addAxis(chartConfig.axes[i]);
                this.axes.push(axis);
            }
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-series
        this.series = [];
        if (chartConfig.series && chartConfig.series.length) {
            n = chartConfig.series.length;
            for (i = 0; i < n; i++) {
                series = this.addSeries(chartConfig.series[i]);
                this.series.push(series);
            }
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-legends
        this.legends = [];
        if (chartConfig.legends && chartConfig.legends.length) {
            n = chartConfig.legends.length;
            for (i = 0; i < n; i++) {
                legend = this.addLegend(chartConfig.legends[i]);
                this.legends.push(legend);
            }
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-setStoryboard
        if (chartConfig.storyboard) {
            this.storyboard = this.setStoryboard(chartConfig.storyboard);
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-ease
        if (chartConfig.ease !== undefined) {
            this.chart.ease = chartConfig.ease;
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-staggerDraw
        if (chartConfig.staggerDraw !== undefined) {
            this.chart.staggerDraw = chartConfig.staggerDraw;
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-assignClass
        if (chartConfig.classes !== undefined) {
            n = chartConfig.classes.length;
            for (i = 0; i < n; i++) {
                aClass = chartConfig.classes[i];
                this.chart.assignClass(aClass.tag, aClass.css);
            }
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-defaultColors
        if (chartConfig.defaultColors !== undefined) {
            n = chartConfig.defaultColors.length;
            colors = [];
            for (i = 0; i < n; i++) {
                color = chartConfig.defaultColors[i];
                colors.push(new dimple.color(color.fill, color.stroke, color.opacity));
            }
            this.chart.defaultColors = colors;
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-customClassList
        if (chartConfig.customClassList !== undefined) {
            this.chart.customClassList = chartConfig.customClassList;
        }
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-setMargins
        margins = chartConfig.margins;
        if (margins !== undefined) {
            this.chart.setMargins(margins.x, margins.y, margins.width, margins.height);
        }

        // Copyright: 2015 AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/chart/methods/addAxis.js
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-addAxis
        this.addAxis  = function (config) {
            var isInt, dimpleAxis, k, nRules, rule,
                // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-position
                position = config.position || null,
                // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-categoryFields
                categoryFields = config.categoryFields || null,
                // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-measure
                measure = config.measure || null,
                // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-timeField
                timeField = config.timeField || null,
                // Help: https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#addTimeAxis
                inputFormat = config.inputFormat || null,
                // Help: https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#addTimeAxis
                outputFormat = config.outputFormat || null;

            isInt = function (value) {
                var x;
                if (isNaN(value)) {
                    return false;
                }
                x = parseFloat(value);
                /*jslint bitwise: true */
                return (x | 0) === x;
            };

            if (isInt(position)) {
                position = this.chart.axes[position];
            }

            if (timeField) {
                dimpleAxis = this.chart.addTimeAxis(position, timeField, inputFormat, outputFormat);
            } else if (config.position === "c" && config.colors) {
                dimpleAxis = this.chart.addColorAxis(measure, config.colors);
            } else {
                dimpleAxis = this.chart.addAxis(position, categoryFields, measure, null);
            }

            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-floatingBarWidth
            if (config.floatingBarWidth !== undefined) {
                dimpleAxis.floatingBarWidth = config.floatingBarWidth;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-hidden
            if (config.hidden !== undefined) {
                dimpleAxis.hidden = config.hidden;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-showPercent
            if (config.showPercent !== undefined) {
                dimpleAxis.showPercent = config.showPercent;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-colors
            if (config.colors !== undefined) {
                dimpleAxis.colors = config.colors;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-overrideMin
            if (config.overrideMin !== undefined) {
                dimpleAxis.overrideMin = config.overrideMin;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-overrideMax
            if (config.overrideMax !== undefined) {
                dimpleAxis.overrideMax = config.overrideMax;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-showGridlines
            if (config.showGridlines !== undefined) {
                dimpleAxis.showGridlines = config.showGridlines;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-dateParseFormat
            if (config.dateParseFormat !== undefined) {
                dimpleAxis.dateParseFormat = config.dateParseFormat;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-tickFormat
            if (config.tickFormat !== undefined) {
                dimpleAxis.tickFormat = config.tickFormat;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-timePeriod
            if (config.timePeriod !== undefined) {
                dimpleAxis.timePeriod = config.timePeriod;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-timeInterval
            if (config.timeInterval !== undefined) {
                dimpleAxis.timeInterval = config.timeInterval;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-useLog
            if (config.useLog !== undefined) {
                dimpleAxis.useLog = config.useLog;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-logBase
            if (config.logBase !== undefined) {
                dimpleAxis.logBase = config.logBase;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-title
            if (config.title !== undefined) {
                dimpleAxis.title = config.title;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-clamp
            if (config.clamp !== undefined) {
                dimpleAxis.clamp = config.clamp;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-ticks
            if (config.ticks !== undefined) {
                dimpleAxis.ticks = config.ticks;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-fontSize
            if (config.fontSize !== undefined) {
                dimpleAxis.fontSize = config.fontSize;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-fontFamily
            if (config.fontFamily !== undefined) {
                dimpleAxis.fontFamily = config.fontFamily;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-autoRotateLabel
            if (config.autoRotateLabel !== undefined) {
                dimpleAxis.floatingBarWidth = config.floatingBarWidth;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-addGroupOrderRule
            if (config.groupOrderRules !== undefined) {
                nRules = config.groupOrderRules.length;
                for (k = 0; k < nRules; k++) {
                    rule = config.groupOrderRules[k];
                    dimpleAxis.addGroupOrderRule(rule.ordering, rule.desc);
                }
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-addOrderRule
            if (config.orderRules !== undefined) {
                nRules = config.orderRules.length;
                for (k = 0; k < nRules; k++) {
                    rule = config.orderRules[k];
                    dimpleAxis.addOrderRule(rule.ordering, rule.desc);
                }
            }
            // return the dimpleAxis
            return dimpleAxis;
        };


        // Source: /src/objects/chart/methods/addLegend.js
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-addLegend
        this.addLegend = function (config) {
            var cSeries, l, nCSeries, lSeries, dimpleLegend;

            cSeries = config.series;
            nCSeries = cSeries ? cSeries.length : 0;
            lSeries = nCSeries ? [] : null;
            for (l = 0; l < nCSeries; l++) {
                lSeries.push(series[cSeries[l]]);
            }

            dimpleLegend = this.chart.addLegend(config.x, config.y, config.width, config.height, config.horizontalAlign, lSeries);

            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleLegend#wiki-fontSize
            if (config.fontSize !== undefined) {
                dimpleLegend.fontSize = config.fontSize;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleLegend#wiki-fontFamily
            if (config.fontFamily !== undefined) {
                dimpleLegend.fontFamily = config.fontFamily;
            }

            return dimpleLegend;
        };

        // Copyright: 2015 AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/chart/methods/addSeries.js
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-addSeries
        this.addSeries = function (config) {
            var dimpleSeries, seriesAxes, nSeriesAxes, j, nRules, rule, nHandlers, handler,
                // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-categoryFields
                categoryFields = config.categoryFields || null,
                // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-plot
                plotFunction = {
                    "area": dimple.plot.area,
                    "bar": dimple.plot.bar,
                    "bubble": dimple.plot.bubble,
                    "line": dimple.plot.line,
                    "pie": dimple.plot.pie
                },
                aggregateFunction = {
                    "avg": dimple.aggregateMethod.avg,
                    "count": dimple.aggregateMethod.count,
                    "max": dimple.aggregateMethod.max,
                    "min": dimple.aggregateMethod.min,
                    "sum": dimple.aggregateMethod.sum
                };
            if (config.axes && config.axes.length) {
                seriesAxes = [];
                nSeriesAxes = config.axes.length;
                for (j = 0; j < nSeriesAxes; j++) {
                    seriesAxes.push(this.axes[config.axes[j]]);
                }
            } else {
                seriesAxes = null;
            }
            dimpleSeries = this.chart.addSeries(categoryFields, plotFunction[config.plotFunction], seriesAxes);
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-x
            if (config.x !== undefined) {
                dimpleSeries.x = this.axes[config.x];
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-y
            if (config.y !== undefined) {
                dimpleSeries.y = this.axes[config.y];
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-z
            if (config.z !== undefined) {
                dimpleSeries.z = this.axes[config.z];
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-c
            if (config.c !== undefined) {
                dimpleSeries.c = this.axes[config.c];
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-p
            if (config.p !== undefined) {
                dimpleSeries.p = this.axes[config.p];
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-plot
            if (config.plot !== undefined) {
                dimpleSeries.plot = plotFunction[config.plot];
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-aggregateFunction
            if (config.aggregate !== undefined) {
                dimpleSeries.aggregate = aggregateFunction[config.aggregate];
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-stacked
            if (config.stacked !== undefined) {
                dimpleSeries.stacked = config.stacked;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-barGap
            if (config.barGap !== undefined) {
                dimpleSeries.barGap = config.barGap;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-clusterBarGap
            if (config.clusterBarGap !== undefined) {
                dimpleSeries.clusterBarGap = config.clusterBarGap;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-lineWeight
            if (config.lineWeight !== undefined) {
                dimpleSeries.lineWeight = config.lineWeight;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-lineMarkers
            if (config.lineMarkers !== undefined) {
                dimpleSeries.lineMarkers = config.lineMarkers;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-afterDraw
            if (config.afterDraw !== undefined) {
                /*jslint evil: true */
                dimpleSeries.afterDraw = new Function("shape", "data", config.afterDraw);
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-interpolation
            if (config.interpolation !== undefined) {
                dimpleSeries.interpolation = config.interpolation;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-tooltipFontSize
            if (config.tooltipFontSize !== undefined) {
                dimpleSeries.tooltipFontSize = config.tooltipFontSize;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-tooltipFontFamily
            if (config.tooltipFontFamily !== undefined) {
                dimpleSeries.tooltipFontFamily = config.tooltipFontFamily;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-radius
            if (config.radius !== undefined) {
                dimpleSeries.radius = config.radius;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-addOrderRule
            if (config.orderRules !== undefined) {
                nRules = config.orderRules.length;
                for (j = 0; j < nRules; j++) {
                    rule = config.orderRules[j];
                    dimpleSeries.addOrderRule(rule.ordering, rule.desc);
                }
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-addEventHandler
            if (config.eventHandlers !== undefined) {
                nHandlers = config.eventHandlers.length;
                for (j = 0; j < nHandlers; j++) {
                    handler = config.eventHandlers[j];
                    /*jslint evil: true */
                    dimpleSeries.addEventHandler(handler.event, new Function("e", handler.handler));
                }
            }

            return dimpleSeries;
        };


        // Copyright: 2015 AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/chart/methods/draw.js
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-draw
        this.draw = function (duration, noDataChange) {
            this.chart.draw(duration, noDataChange);
            // Return the chart for chaining
            return this;

        };

        // Copyright: 2015 AlignAlytics
        // License: "https://github.com/PMSI-AlignAlytics/dimple/blob/master/MIT-LICENSE.txt"
        // Source: /src/objects/chart/methods/setStoryboard.js
        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-setStoryboard
        this.setStoryboard = function (config) {
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.storyboard#wiki-onTick
            var tickHandler, storyboard;
            if (config.onTick !== undefined) {
                /*jslint evil: true */
                tickHandler = new Function("e", config.onTick);
            }
            storyboard = this.chart.setStoryboard(config.categoryFields, tickHandler);

            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.storyboard#wiki-autoplay
            if (config.autoplay !== undefined) {
                storyboard.autoplay = config.autoplay;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.storyboard#wiki-frameDuration
            if (config.frameDuration !== undefined) {
                storyboard.frameDuration = config.frameDuration;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.storyboard#wiki-storyLabel
            if (config.storyLabel !== undefined) {
                storyboard.storyLabel = config.storyLabel;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.storyboard#wiki-fontSize
            if (config.fontSize !== undefined) {
                storyboard.fontSize = config.fontSize;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.storyboard#wiki-fontFamily
            if (config.fontFamily !== undefined) {
                storyboard.fontFamily = config.fontFamily;
            }

            return storyboard;
        };

    };
    // End dimple.chart



    return simpledimple;
}));
// End simpledimple
