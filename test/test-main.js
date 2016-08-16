var tests = [],
    file;

for (file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/\.spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
        'd3': 'bower_components/d3/d3.min',
        'dimple': 'bower_components/dimple/dist/dimple.latest.min',
        'simpledimple': 'tmp/simpledimple'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
