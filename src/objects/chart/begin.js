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
