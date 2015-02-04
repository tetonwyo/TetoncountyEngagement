/*!
 * Handler for custom modal triggers
 */
;(function( $ ){

    // Cache selectors, and create modal element on page.
    var $body  = $('body'),
        $modal = $('<div />', {
          'class' : 'modal fade',
          'html'  : '<div class="modal-dialog"><div class="modal-content"><div class="modal-body"></div><div class="modal-footer" style="margin:0;"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button</div></div></div>'
        }).appendTo( $body );


    // Delegate click listener to body in case .modalize-iframe elements are added dynamically
    $body.on('click', '.modalize-iframe', function(){
        var $trigger = $(this);
        // reset 'modal-dialog' class if any classes had been added previously
        $('.modal-dialog', $modal).attr('class', 'modal-dialog ' + $trigger.attr('data-size'));
        // clear previous content (iframe), build/append new one
        $('.modal-body', $modal).empty().append( $('<iframe />', {
          src    : $trigger.attr('data-src'),
          style  : 'width:100%;border:0 !important;min-height:'+$trigger.attr('data-minheight')+'px;'
        }));
        // open it
        $modal.modal();
    });


})( jQuery );
