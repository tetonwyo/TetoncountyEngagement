/**
 * Main application declaration, config, and init'ing run method.
 */
;(function (window, angular, undefined) {
    'use strict';

    var ENVIRONMENT = 'dev'; // 'dev' or 'prod'

    /**
     * Main module.
     */
    angular.module('tyo-mobile', ['ngRoute', 'ngSanitize', 'calendry']).


        /**
         * Module configuration
         */
        config(['$provide', '$routeProvider', '$locationProvider', function ($provide, $routeProvider, $locationProvider) {
            // Push vs hash-based nav
            $locationProvider.html5Mode(true).hashPrefix('!');

            // Route handler
            $routeProvider
                .when('/event/:eventID', {templateUrl: 'template/event-view', controller: 'CtrlEventView'})
                .otherwise({redirectTo: '/calendar/index.html', template: false});


            /**************************************************************************
             * Define ApiPaths factory to hold all the routes, *depending* on environment
             ***************************************************************************/
            // If 'dev' (ie. running locally)
            if (ENVIRONMENT === 'dev') {
                $provide.factory('ApiPaths', function () {
                    return {
                        base: 'http://localhost:49703/calendar/data-mocks/',
                        resources: {
                            eventList: 'calevents.js',
                            eventDetail: 'caleventdetails.js',
                            departments: 'departments.js',
                            tags: 'tags.js'
                        },
                        routeFor: function (_resource) {
                            return this.base + this.resources[_resource];
                        }
                    }
                });
                return;
            }

            // If 'prod'
            $provide.factory('ApiPaths', function () {
                return {
                    base: '//tc.tstr.co/data/',
                    resources: {
                        eventList: 'CalEvents.ashx',
                        eventDetail: 'CalEventsDetail.ashx',
                        departments: 'organizations.ashx?view=events',
                        tags: 'tags.ashx'
                    },
                    routeFor: function (_resource) {
                        return this.base + this.resources[_resource];
                    }
                }
            });
        }]).


        /**
         * Run once on app init (ie. page reload)
         */
        run(['$rootScope', '$route', function ($rootScope, $route) {
            // Instead of loading the event view with a directive, we're using the
            // main 'ng-view' directive; setting the $route on the rootScope lets
            // us determine whether to add a body class or not (ie. this is how we
            // can pass a url to a specific event and have the router handle it).
            $rootScope._route = $route;

            // Toggle true/false to trigger showing/hiding filters.
            $rootScope._showFilters = false;
        }]);

})(window, window.angular);
