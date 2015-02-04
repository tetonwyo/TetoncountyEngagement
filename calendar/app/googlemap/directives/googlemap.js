angular.module('tyo-mobile').

    directive('googlemap', ['GoogleMap', function( GoogleMap ){

        var _mapObj   = false,
            _defaults = {
                zoom             : 15,
                // Neutral Blue
                styles           : [{"featureType":"all","elementType":"all","stylers":[{"invert_lightness":true},{"saturation":10},{"lightness":30},{"gamma":0.5},{"hue":"#435158"}]}],
                // Snazzy Maps
                //styles           : [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333739"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"featureType":"poi","stylers":[{"color":"#2ecc71"},{"lightness":-7}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-28}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"visibility":"on"},{"lightness":-15}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-18}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2ecc71"},{"lightness":-34}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"poi.park","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#333739"},{"weight":0.3},{"lightness":10}]}],
                mapTypeId        : GoogleMap.MapTypeId.SATELLITE,
                disableDefaultUI : true
            };

        return {
            restrict: 'A',
            scope: {
                mapOptions: '=googlemap'
            },
            replace: true,
            template: '<div></div>',
            link: function( $scope, $element, attrs ){
                // mapOptions is 2-way bound and gets passed from the CtrlEventView
                // once the EventObj is loaded; so watch for changes and only instantiate
                // the map once mapOptions is a valid JSON object.
                $scope.$watch('mapOptions', function( _options ){
                    if( _options && !(_mapObj) ){
                        _mapObj = new GoogleMap.Map($element[0], angular.extend($scope.mapOptions, _defaults));
                    }
                });

                // Cleanup
                $scope.$on('$destroy', function(){
                    $element.remove();
                    _mapObj = false;
                });
            }
        }
    }]);