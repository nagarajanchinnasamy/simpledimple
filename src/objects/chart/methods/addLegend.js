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
