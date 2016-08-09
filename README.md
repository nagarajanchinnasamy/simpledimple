### simpledimple.js ###

Aim of [simpledimple.js](http://nagarajanchinnasamy.com/simpledimple) is to further simplify use of powerful visualization library [dimple](http://dimplejs.org/).

Simpledimple.js is a wrapper around dimple's API. This wrapper accepts properties of a chart (E.g., parameters of axis, series etc.) as a JavaScript object. These properties can be externally stored and exchanged. Interactive chart designing tools can be used to generate these properties.

To draw a chart, create a `simpledimple.chart` object and invoke `draw()` function of that chart object:

    var chartConfig = {
        width: 590,
        height: 400,
        bounds: {
            x: 70,
            y: 30,
            width: 505,
            height: 305
        },
        axes: [{
            position: "x",
            categoryFields: "Month",
            orderRules: [{ ordering: "Date" }]
        }, {
            position: "y",
            measure: "Unit Sales"
        }],
        series: [{
            plot: "area",
            interpolation: "step",
            lineWeight: 1
        }]
    };
    var myChart = new simpledimple.chart("#chartContainer", chartConfig, data);
    myChart.draw();

