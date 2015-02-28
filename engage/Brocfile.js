/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  lessOptions: {
    paths: [
      'bower_components/bootstrap/less'
    ]
  }
});

app.import("bower_components/bootstrap/js/carousel.js");
app.import("bower_components/bootstrap/js/transition.js");

module.exports = app.toTree();
