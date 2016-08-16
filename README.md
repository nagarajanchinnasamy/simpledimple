## Simpledimple.js ##

[Simpledimple.js](http://nagarajanchinnasamy.com/simpledimple) is opensource lightweight JavaScript thin wrapper API around **dimple**.

[dimple](http://dimplejs.org/) is a simply powerful object-oriented API for business analytics powered by [D3.js](https://d3js.org/).

[Simpledimple.js](http://nagarajanchinnasamy.com/simpledimple) is originally written by [Nagarajan Chinnasamy](https://github.com/nagarajanchinnasamy/) at [Mindtree](http://mindtree.com/).

## What does it do? ##

[Simpledimple.js](http://nagarajanchinnasamy.com/simpledimple)

    * Separates the configuration of properties of charts from JavaScript code
    * Facilitates externalization of the parameters of a chart thus opening the possibilities of:
        * Interactive tools based designing of charts
        * External storage and
        * Exchange of charts

This wrapper API accepts the entire configuration of a chart (E.g., parameters of axis, series etc.) as a single JavaScript object and internally handles the calls to be made to [dimple](http://dimplejs.org/). Following is an example chart configuration:

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

## How do I load the code?

Simpledimple.js implements the [Universal Module Definition (UMD)](https://github.com/umdjs/umd) pattern and so should be compatible with most approaches to script loading and dependency management: direct script loading with [RequireJS](http://requirejs.org/), [Browserify](http://browserify.org/) etc. For these options, you can grab it from [NPM](https://www.npmjs.com/package/simpledimple) with `npm install simpledimple` or via [Bower](http://bower.io/) with `bower install simpledimple`.

If you are loading the scripts directly (as in the [examples](http://nagarajanchinnasamy.com/simpledimple)), you need to:

1. Load the dependencies:
  1. d3  - `<script src="https://d3js.org/d3.v3.min.js"></script>`
  2. dimple - `<script src="http://dimplejs.org/dist/dimple.v2.1.4.min.js"></script>`
2. Load the simpledimple.js files:
  1. `simpledimple.min.js`

Here is the source code of an [exmaple](https://github.com/nagarajanchinnasamy/simpledimple/blob/master/examples/area_steps_horizontal.html) 

## Where can I see the demo?

You can see the live demo at [examples page](http://nagarajanchinnasamy.com/simpledimple/viewer/index.html).

## Is there an online tool to experiment and design my own charts?

Yes. You can use the [fiddle tool](http://nagarajanchinnasamy.com/simpledimple/fiddle/index.html) to:

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
