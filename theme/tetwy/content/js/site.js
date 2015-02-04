/*! Responsive utilities for 2014 updates. */
(function( $ ){

    var $primaryNav = $('nav');


    /**
     * Straight from Modernizr src.
     * @returns {boolean}
     */
    function is_touch_device() {
        return !!('ontouchstart' in window);
    }


    /**
     * If *not* a touch device, then do stuff...
     */
    if( ! is_touch_device() ){
        console.log('isnot!');
    }


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