angular.module('tyo-mobile').

    factory('GoogleMap', ['$window', function( $window ){
        return $window['google']['maps'] || {};
    }]);