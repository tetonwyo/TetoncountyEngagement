angular.module('tyo-mobile').

    controller('CtrlMain', ['$rootScope', '$scope', '$timeout', '$location', 'DataContext', function( $rootScope, $scope, $timeout, $location, DataContext ){

        $scope.refinements = {};


        /**
         * Instead of passing the entire $scope.refinements object in the query, we
         * transform it here into something that can be easily serialized into a GET request.
         * @returns {{}}
         */
        function transformRefinements(){
            var _filters = {};

            if( $scope.refinements.event_type ){
                _filters.event_type = $scope.refinements.event_type.toLowerCase();
            }

            if( $scope.refinements.search ){
                _filters.search_text = $scope.refinements.search;
            }

            if( angular.isArray($scope.refinements.tag_list) ){
                _filters['tags[]'] = $scope.refinements.tag_list.map(function( tagObj ){
                    return tagObj.tag;
                });
            }

            if( angular.isArray($scope.refinements.dept_list) ){
                _filters['depts[]'] = $scope.refinements.dept_list.map(function( deptObj ){
                    return deptObj.organizationId;
                });
            }

            return _filters;
        }


        /**
         * Used to update event data when a) the calendar onMonthChange method is called;
         * or b) filters are sunmitted.
         */
        function queryEvents(){
            if( $scope.sharedController ){
                var _mm     = $scope.sharedController.getCurrentMonthMap(),
                    params  = angular.extend({
                        from: _mm.calendarStart.format('YYYY-MM-DD'),
                        to:   _mm.calendarEnd.format('YYYY-MM-DD')
                    }, transformRefinements());

                // Hit the API
                DataContext.getEventList(params).then(function( resp ){
                    $scope.sharedController.setEvents(resp.data);
                });
            }
        }


        /**
         * Setup calendarSettings
         * @type {{onMonthChange: onMonthChange}}
         */
        $scope.calendarSettings = {
            // onChangeMethod gets called with 'this' as the directive instance controller
            onMonthChange: function(){
                queryEvents();
            }
        };


        /**
         * Function to toggle the filters open/closed.
         */
        $scope.toggleFilters = function(){
            $rootScope._showFilters = !($rootScope._showFilters);
        };


        /**
         * Handle the form "applying" the filters (search/tags/departments)
         */
        $scope.submitFilters = function(){
            $rootScope._showFilters = false;
            queryEvents();
        };


        // Get list of available tags
        DataContext.getTagList().then(function (resp) {
            if (resp.data) {
                $scope.availableTags = resp.data;
            }
        });


        // Get list of available departments
        DataContext.getDepartmentList().then(function (resp) {
            if (resp.data) {
                $scope.availableDepartments = resp.data;
            }
        });


        // Event types
        DataContext.getEventTypes().then(function( eventList ){
            $scope.eventTypes = eventList;
        });

    }]);