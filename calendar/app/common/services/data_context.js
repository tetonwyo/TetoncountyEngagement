/**
 * Service for querying calendar data.
 * @todo: implement calls via BreezeJS
 */
angular.module('tyo-mobile').service('DataContext', ['$http', '$q', 'ApiPaths',
    function ($http, $q, ApiPaths) {

        var _self = this;


        /**
         * Get list of available event types. Make part of the DataContext service in
         * case this expands one day and we end up querying for available meeting types;
         * but can hardcode for now. Wrap in a promise so when http is swapped in we can
         * use the same interface.
         * @returns {string[]}
         */
        _self.getEventTypes = function(){
            var deferred = $q.defer();

            deferred.resolve([
                'General',
                'Meetings',
                'News'
            ]);

            return deferred.promise;
        };


        /**
         * Get a list of events. Note: to work w/ the FullCalendar plugin,
         * the function args are standardized, and we have to execute the
         * callback once the events are received. So this doesn't "return"
         * a list of events, per say.
         */
        _self.getEventList = function( _filters ){
            return $http.get(ApiPaths.routeFor('eventList'), {
                cache: true,
                params: angular.extend({
                    allow: true
                }, (_filters || {}))
            });
        };


        /**
         * Get an event by its ID, and return the promise object.
         */
        _self.getEventByID = function (_eventID) {
            return $http.get(ApiPaths.routeFor('eventDetail'), {
            //return $http.get('//tc.tstr.co/test/_calendar/data-mocks/caleventdetails.js', {
                params: {
                    allow: true,
                    eventID: _eventID
                }
            });
        };


        /**
         * Get the list of available tags from the server.
         */
        _self.getTagList = function () {
            return $http.get(ApiPaths.routeFor('tags'), {
                params: {
                    allow: true
                }
            });
        };


        /**
         * Get a list of available departments.
         */
        _self.getDepartmentList = function () {
            return $http.get(ApiPaths.routeFor('departments'), {
                params: {
                    allow: true
                }
            });
        };

    }
])
