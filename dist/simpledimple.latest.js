// Copyright: 2016 Nagarajan Chinnsamy, Mindtree and Other Contributors
// License: https://github.com/nagarajanchinnasamy/simpledimple/blob/master/LICENSE


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
                context.simpledimple = simpledimple(context.d3, context.dimple);
            }
        }
    }

}(this, function (d3, dimple) {
    "use strict";
    /*jslint unparam: true*/

    // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart
    function SimpleDimpleChart(parentSelector, chartConfig, data) {
        var bounds, noFormats, i, n, axis, series, legend, aClass, colors, color, margins, makeEventHandler;

        makeEventHandler = function (handler, chart, data, userData) {
            return function (e) {
                handler(e, chart, data, userData);
            };
        };

        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-addAxis
        this.addAxis  = function (config) {
            var j, m, isInt, dimpleAxis, rule,
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
                outputFormat = config.outputFormat || null,
                timePeriods = {
                    seconds: d3.time.seconds,
                    minutes: d3.time.minutes,
                    hours: d3.time.hours,
                    days: d3.time.days,
                    weeks: d3.time.weeks,
                    sundays: d3.time.sundays,
                    mondays: d3.time.mondays,
                    tuesdays: d3.time.tuesdays,
                    wednesdays: d3.time.wednesdays,
                    thursdays: d3.time.thursdays,
                    fridays: d3.time.fridays,
                    saturdays: d3.time.saturdays,
                    months: d3.time.months,
                    years: d3.time.years
                };

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
                if (config.timeField !== undefined) {
                    dimpleAxis.overrideMin = new Date(config.overrideMin);
                } else {
                    dimpleAxis.overrideMin = config.overrideMin;
                }
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-overrideMax
            if (config.overrideMax !== undefined) {
                if (config.timeField !== undefined) {
                    dimpleAxis.overrideMax = new Date(config.overrideMax);
                } else {
                    dimpleAxis.overrideMax = config.overrideMax;
                }
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
                dimpleAxis.timePeriod = timePeriods[config.timePeriod];
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
                m = config.groupOrderRules.length;
                for (j = 0; j < m; j++) {
                    rule = config.groupOrderRules[j];
                    dimpleAxis.addGroupOrderRule(rule.ordering, rule.desc);
                }
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleAxis#wiki-addOrderRule
            if (config.orderRules !== undefined) {
                m = config.orderRules.length;
                for (j = 0; j < m; j++) {
                    rule = config.orderRules[j];
                    dimpleAxis.addOrderRule(rule.ordering, rule.desc);
                }
            }
            // return the dimpleAxis
            return dimpleAxis;
        };

        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-addLegend
        this.addLegend = function (config) {
            var  j, m, cSeries, lSeries, dimpleLegend;

            cSeries = config.series;
            m = cSeries ? cSeries.length : 0;
            lSeries = m ? [] : null;
            for (j = 0; j < m; j++) {
                lSeries.push(series[cSeries[j]]);
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

        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-addSeries
        this.addSeries = function (config) {
            var  j, m, dimpleSeries, seriesAxes, rule, handler,
                // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-categoryFields
                categoryFields = config.categoryFields || null,
                // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-plot
                plotFunctions = {
                    "area": dimple.plot.area,
                    "bar": dimple.plot.bar,
                    "bubble": dimple.plot.bubble,
                    "line": dimple.plot.line,
                    "pie": dimple.plot.pie
                },
                aggregateFunctions = {
                    "avg": dimple.aggregateMethod.avg,
                    "count": dimple.aggregateMethod.count,
                    "max": dimple.aggregateMethod.max,
                    "min": dimple.aggregateMethod.min,
                    "sum": dimple.aggregateMethod.sum
                }, afterDraw;
            if (config.axes && config.axes.length) {
                seriesAxes = [];
                m = config.axes.length;
                for (j = 0; j < m; j++) {
                    seriesAxes.push(this.axes[config.axes[j]]);
                }
            } else {
                seriesAxes = null;
            }
            dimpleSeries = this.chart.addSeries(categoryFields, plotFunctions[config.plot], seriesAxes);
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
                dimpleSeries.plot = plotFunctions[config.plot];
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-aggregateFunction
            if (config.aggregate !== undefined) {
                dimpleSeries.aggregate = aggregateFunctions[config.aggregate];
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
                afterDraw = new Function("shape", "shapeData", "chart", "data", "userData", config.afterDraw);
                dimpleSeries.afterDraw = function (shape, shapeData) {
                    afterDraw(shape, shapeData, this.chart, this.data, this.userData);
                };
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
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-innerRadius
            if (config.innerRadius !== undefined) {
                dimpleSeries.innerRadius = config.innerRadius;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-outerRadius
            if (config.outerRadius !== undefined) {
                dimpleSeries.outerRadius = config.outerRadius;
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-addOrderRule
            if (config.orderRules !== undefined) {
                m = config.orderRules.length;
                for (j = 0; j < m; j++) {
                    rule = config.orderRules[j];
                    dimpleSeries.addOrderRule(rule.ordering, rule.desc);
                }
            }
            // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-addEventHandler
            if (config.eventHandlers !== undefined) {
                m = config.eventHandlers.length;
                for (j = 0; j < m; j++) {
                    /*jslint evil: true */
                    handler = new Function("e", "chart", "data", "userData", config.eventHandlers[j].handler);
                    dimpleSeries.addEventHandler(config.eventHandlers[j].event, makeEventHandler(handler, this.chart, this.data, this.userData));
                }
            }

            return dimpleSeries;
        };

        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#wiki-draw
        this.draw = function (duration, noDataChange) {
            this.chart.draw(duration, noDataChange);
            if (this.afterDraw) {
                this.afterDraw(this);
            }
            // Return the chart for chaining
            return this;
        };

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

        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-afterDraw
        this.userData = {};

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
        // Help: https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#assignColor
        if (chartConfig.assignedColors !== undefined) {
            n = chartConfig.assignedColors.length;
            colors = {};
            for (i = 0; i < n; i++) {
                color = chartConfig.assignedColors[i];
                colors[color.tag] = this.chart.assignColor(color.tag, color.fill, color.stroke, color.opacity);
            }
            this.chart.assignedColors = colors;
        }

        // Help: http://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.dimpleSeries#wiki-afterDraw
        if (chartConfig.afterDraw !== undefined) {
            /*jslint evil: true */
            this.afterDraw = new Function("simpledimple", chartConfig.afterDraw);
        }

        return this;
    }

    // Create the stub object
    var simpledimple = {
        version: "1.0.0",
        newChart: function (parentSelector, chartConfig, data) {
            return new SimpleDimpleChart(parentSelector, chartConfig, data);
        }
    };

    return simpledimple;
}));
// End simpledimple
