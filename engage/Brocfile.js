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

app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf',
  {destDir: 'assets/fonts'}
);
app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.eot',
  {destDir: 'assets/fonts'}
);
app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.svg',
  {destDir: 'assets/fonts'}
);
app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff',
  {destDir: 'assets/fonts'}
);
app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2',
  {destDir: 'assets/fonts'}
);

module.exports = app.toTree();
