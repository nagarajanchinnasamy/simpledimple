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

