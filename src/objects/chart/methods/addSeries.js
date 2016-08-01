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

