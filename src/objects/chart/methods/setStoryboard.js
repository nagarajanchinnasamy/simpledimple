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
