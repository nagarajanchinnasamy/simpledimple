## Simpledimple.js ##

Aim of [simpledimple.js](http://nagarajanchinnasamy.com/simpledimple) is to further simplify the use of powerful visualization library [dimple](http://dimplejs.org/).

[Simpledimple.js](http://nagarajanchinnasamy.com/simpledimple)

    * Separates the configuration of properties of charts from JavaScript code
    * Facilitates externalization of the parameters of a chart thus opening the possibilities of:
        * Interactive tools based designing of charts
        * External storage and
        * Exchange of charts

[Simpledimple.js](http://nagarajanchinnasamy.com/simpledimple) is a wrapper around dimple's API. This wrapper accepts the entire configuration of a chart (E.g., parameters of axis, series etc.) as a single JavaScript object and internally handles the calls to be made to [dimple](http://dimplejs.org/). Following is an example chart configuration:

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

  To draw a chart, you need to create a `simpledimple.chart` object and invoke `draw()` function of that chart object passing the chart configuration:

    var myChart = new simpledimple.chart("#chartContainer", chartConfig, data);
    myChart.draw();

## Where can I see the demo?

You can see the live demo at [examples page](http://nagarajanchinnasamy.com/simpledimple/viewer.html).

## Is there an online tool to experiment and design my own charts?

Yes. You can use the [fiddle tool](http://nagarajanchinnasamy.com/simpledimple/fiddle.html) to:

    * Load sample or your own data
    * Browse and load sample chart configuration and edit
    * Verify and create your own charts


## How can I build the code and run the tests?

To install the development dependencies, just run `npm install`, which will create a `node_modules` directory with the files required to run the [Grunt](http://gruntjs.com/) build system.

After modifying any of the `.js` files at the top of the repo, you can compile/minify the files into the `dist` directory by running `grunt` command. This also starts a webserver bound to port 3001 that can be used to list the examples using the URL: http://localhost:3001/examples/

## How can I contribute?

Pull requests are welcome! Here are some [Contribution Guidelines](https://github.com/nagarajanchinnasamy/simpledimple/blob/master/CONTRIBUTING.md).

## I have a question, how can I get in touch?

Please first check the [issues](https://github.com/nagarajanchinnasamy/simpledimple/issues) that are already raised and if you can't find what you're looking for there, then please [create a GitHub  Issue](https://github.com/nagarajanchinnasamy/simpledimple/issues/new). When creating an issue, please try to provide a replicable test case so that others can more easily help you.

## Copyright & Licence (MIT License)

Simpledimple.js is © 2016 Nagarajan Chinnasamy, Mindtree, other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
