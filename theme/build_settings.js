module.exports = function( grunt, _configs ){

  function pathCommon( _path ){
    return '/home/vagrant/app/wwwroot/theme/common/%s'.replace('%s', _path);
  }

  function pathTetwy( _path ){
    return '/home/vagrant/app/wwwroot/theme/tetwy/content/%s'.replace('%s', _path);
  }

  function pathFair( _path ){
    return '/home/vagrant/app/wwwroot/theme/fair/content/%s'.replace('%s', _path);
  }

  /*************************************************************
   * Concat tasks
   ************************************************************/
   // Target: theme/tetwy/js/site.js
   _configs.concat.tetwy = { files: {} };
   _configs.concat.tetwy.files[ pathTetwy('js/site.js') ] = [
       pathCommon('js/components/nav-bar.js'),
       pathTetwy('js/src/site.js')
   ];

   // Target: theme/fair/content/js/agency.js
  _configs.concat.fair = { files: {} };
  _configs.concat.fair.files[ pathFair('js/agency.js') ] = [
      pathCommon('bootstrap_src/js/transition.js'),
      pathCommon('bootstrap_src/js/collapse.js'),
      pathCommon('bootstrap_src/js/carousel.js'),
      pathCommon('bootstrap_src/js/modal.js'),
      pathCommon('js/components/modalize.js'),
      pathCommon('js/components/nav-bar.js'),
      pathFair('js/src/agency.js')
  ];


  /*************************************************************
   * LESS compiler
   ************************************************************/
  _configs.less = {
      options: {
          paths: [pathCommon('bootstrap_src')],
          compress: true,
          cleancss: true
      },
      common: {
          files: [{
              expand : true,
              cwd    : pathCommon('css'),
              src    : ['*.less', '!variables.less'],
              dest   : pathCommon('css'),
              ext    : '.css'
          }]
      },
      tetwy: {
          files : [{ // main
              expand : true,
              cwd    : pathTetwy('css'),
              src    : ['*.less'],
              dest   : pathTetwy('css'),
              ext    : '.css'
          }]
      },
      fair: {
          files : [{
              expand : true,
              cwd    : pathFair('css'),
              src    : ['*.less'],
              dest   : pathFair('css'),
              ext    : '.css'
          }]
      }
  }


  /*************************************************************
   * Watch tasks
   ************************************************************/
  _configs.watch.options = {spawn: false};

  _configs.watch.common_css = {
      files : [pathCommon('css/**/*.less')],
      tasks : ['less:common']
  }

  _configs.watch.common_js_components = {
      files : [pathCommon('js/components/*.js')],
      tasks : ['concat']
  }

  _configs.watch.tetwy_css = {
      files : [pathTetwy('css/**/*.less')],
      tasks : ['newer:less']
  };

  _configs.watch.tetwy_js = {
      files : [pathTetwy('js/src/*.js')],
      tasks : ['newer:concat:tetwy']
  };

  _configs.watch.fair_css = {
      files : [pathFair('css/*.less')],
      tasks : ['newer:less']
  };

  _configs.watch.fair_js = {
      files : [pathFair('js/src/*.js')],
      tasks : ['newer:concat:fair']
  };

  _configs.watch.generated_css = {
      options : {livereload: true},
      files   : [pathCommon('css/*.css'), pathTetwy('css/*.css'), pathFair('css/*.css')],
      tasks   : []
  }

};
