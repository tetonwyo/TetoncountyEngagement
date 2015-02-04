/*! By Osvaldas Valutis, www.osvaldas.info; Available for use under the MIT License; @ref: http://osvaldas.info/drop-down-navigation-responsive-and-touch-friendly */
//;(function(e,t,n,r){e.fn.doubleTapToGo=function(r){if(!("ontouchstart"in t)&&!navigator.msMaxTouchPoints&&!navigator.userAgent.toLowerCase().match(/windows phone os 7/i))return false;this.each(function(){var t=false;e(this).on("click",function(n){var r=e(this);if(r[0]!=t[0]){n.preventDefault();t=r}});e(n).on("click touchstart MSPointerDown",function(n){var r=true,i=e(n.target).parents();for(var s=0;s<i.length;s++)if(i[s]==t[0])r=false;if(r)t=false})});return this}})(jQuery,window,document);


/*!
 * Navbar handler customizations (beyond bootstrap defaults).
 */
;(function( $ ){

  var $primaryNav = $('nav.nav');


  /**
   * Straight from Modernizr src (tests if touch device).
   * @returns {boolean}
   */
  function is_touch_device() {
      return !!('ontouchstart' in window);
  }


  /**
   * If *is* touch device, initialize doubleTapToGo.
   */
  if( is_touch_device() ){
      //$('li:has(ul)', $primaryNav).doubleTapToGo();

      // $('li').on('touchstart', function(_ev){
      //   console.log(_ev);
      // });
  }

  var $lastClicked;
  $primaryNav.on('click', 'li.dropdown', function( _ev ){
    if( $lastClicked == _ev.target || !($primaryNav.hasClass('sidebar-if-mobile')) ){return;}
    _ev.preventDefault();
    $lastClicked = _ev.target;
    $(this).toggleClass('expanded');
  });


  /**
   * On clicking the navbar-toggle button, add a class to the
   * root nav element, which will only be applied if corresponding
   * media query is activated by screen size.
   */
  $primaryNav.on('click', '.navbar-toggle', function(_ev){
      $primaryNav.toggleClass('sidebar-if-mobile');
  });


  /**
   * Sidebar nav close button
   */
  $primaryNav.on('click', '#triggerSidebarClose', function(){
      $primaryNav.removeClass('sidebar-if-mobile');
  });

})( jQuery );
