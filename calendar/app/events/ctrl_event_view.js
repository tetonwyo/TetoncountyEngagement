angular.module('tyo-mobile').controller('CtrlEventView', ['$scope', '$location', '$routeParams', '$filter', 'DataContext', 'GoogleMap',
    function ($scope, $location, $routeParams, $filter, DataContext, GoogleMap) {

        $scope.openMap = false;

        $scope.toggleMapView = function(){
            $scope.openMap = ! $scope.openMap;
        };

        // Equivalent to "close" button (navigating back to calendar route implicitly hides the ng-view)
        $scope.backToCalendar = function () {
            $location.path('/');
        };


        function decorateEvent( eventObj ){
            var _startDate = $filter('date')(eventObj.start, 'MMM d, yyyy'),
                _startTime = $filter('date')(eventObj.start, 'h:mm a'),
                _endDate   = $filter('date')(eventObj.end, 'MMM d, yyyy'),
                _endTime   = $filter('date')(eventObj.end, 'h:mm a');

            // Are the events occurring on two different days?
            if( !(_startDate === _endDate) ){
                eventObj.displayDate = _startDate + ' - ' + _endDate;
            }else{
                eventObj.displayDate = _startDate + ' ' + _startTime + ' - ' + _endTime;
            }

            // Does the place object have valid lat/lng?
            //eventObj.validLocation = (+($scope.eventObj.place.latitude) !== 0 );
        }


        // Get event details from API
        DataContext.getEventByID($routeParams.eventID).then(function (resp) {
            // Set eventObj on the scope
            $scope.eventObj = resp.data;

            // Decorate it (setup fields so we don't have to do a bunch of logic in the view)
            decorateEvent($scope.eventObj);

            // Pass mapSettings
            //if( $scope.eventObj.validLocation ){
                $scope.mapSettings = {
                    //center: new GoogleMap.LatLng(+$scope.eventObj.place.latitude, +$scope.eventObj.place.longitude)
                    center: new GoogleMap.LatLng(43.479075, -110.746176)
                }
            //}
        });
    }
]);
