;(function( window, angular, undefined ){
    'use strict';

    angular.module('calendry', []).


        /**
         * Wrap 'moment' from the global scope for angular DI, or set to false if unavailable.
         */
        factory('MomentJS', ['$window', '$log', function( $window, $log ){
            return $window['moment'] ||
                ($log.warn('Moment.JS not available in global scope, Calendry will be unavailable.'), false);
        }]).


        /**
         * Calendry directive
         */
        directive('calendry', ['$cacheFactory', '$document', '$log', '$timeout', '$q', 'MomentJS',
            function factory( $cacheFactory, $document, $log, $timeout, $q, MomentJS ){

                // If MomentJS is not available, don't initialize the directive!
                if( ! MomentJS ){
                    $log.warn('Calendry not instantiated due to missing MomentJS library');
                    return;
                }


                var _document       = $document[0],
                    _monthMapCache  = $cacheFactory('monthMap'),
                    // Cache keys
                    _monthMapKey    = 'YYYY_MM',
                    _eventMapKey    = 'YYYY_MM_DD',
                    // Default settings
                    _defaults       = {
                        daysOfWeek      : MomentJS.weekdaysShort(),
                        currentMonth    : MomentJS(),
                        dayCellClass    : 'day-node',
                        eventCellClass  : 'event-node',
                        // Callbacks
                        onMonthChange   : null
                    };


                /**
                 * Instantiable method for creating month maps.
                 * @param monthStartMoment
                 * @constructor
                 */
                function MonthMap( monthStartMoment ){
                    this.monthStart         = monthStartMoment;
                    this.monthEnd           = MomentJS(this.monthStart).endOf('month');
                    this.calendarStart      = MomentJS(this.monthStart).subtract('day', this.monthStart.day());
                    this.calendarEnd        = MomentJS(this.monthEnd).add('day', (6 - this.monthEnd.day()));
                    this.calendarDayCount   = Math.abs(this.calendarEnd.diff(this.calendarStart, 'days'));
                    this.calendarDays       = (function( daysInCalendar, calendarStart, _array ){
                        // Loop {daysInCalendar} times and create a new moment object
                        for( var _i = 0, _day = 0, _week = 0; _day <= daysInCalendar; _day++, _i++ ){
                            if( _i === 7 ){ _i = 0; _week++; }
                            if(! _array[_week]){ _array[_week] = []; }
                            _array[_week].push(MomentJS(calendarStart).add('days', _day));
                        }
                        return _array;
                    })( this.calendarDayCount, this.calendarStart, []);
                }


                /**
                 * Generate a list of moment objects, grouped by weeks visible on the calendar.
                 * @param MomentJS _month : Pass in a moment object to derive the month, or the current month will be
                 * used automatically.
                 * @returns {Array}
                 */
                function getMonthMap( _month ){
                    var monthStart = MomentJS.isMoment(_month) ? MomentJS(_month).startOf('month') : MomentJS({day:1}),
                        _cacheKey  = monthStart.format(_monthMapKey);

                    // In cache?
                    if( _monthMapCache.get(_cacheKey) ){
                        $log.log('Using cached month map.');
                        return _monthMapCache.get(_cacheKey);
                    }

                    // Hasn't been created yet, do so now.
                    _monthMapCache.put(_cacheKey, new MonthMap(monthStart));

                    // Return the cache item
                    return _monthMapCache.get(_cacheKey);
                }


                /**
                 * Get the id attribute for a day cell.
                 * @param MomentJS | MomentObj
                 * @returns {string}
                 */
                function getDayCellID( MomentObj ){
                    return _defaults.dayCellClass + '-' + MomentObj.format('YYYY_MM_DD');
                }


                /**
                 * Passing in a monthMapObj, this will return a document fragment of the
                 * composed calendar DOM elements.
                 * @note: This caches documentFragments the first time they're generated, and
                 * returns CLONED elements each time thereafter.
                 * @param MonthMap | monthMapObj
                 * @returns {DocumentFragment|Object|*}
                 */
                var docFrags = {};
                function getCalendarFragment( monthMapObj ){
                    var momentNow   = MomentJS(),
                        cacheKey    = monthMapObj.monthStart.format('YYYY_MM');

                    if( ! docFrags[cacheKey] ){
                        var docFragment = _document.createDocumentFragment(),
                            flattened   = [].concat.apply([], monthMapObj.calendarDays);

                        for( var _i = 0, _len = flattened.length; _i < _len; _i++ ){
                            var cell    = _document.createElement('div'),
                                inMonth = flattened[_i].isSame(monthMapObj.monthStart, 'month') ? 'month-incl' : 'month-excl',
                                isToday = flattened[_i].isSame(momentNow, 'day') ? 'is-today' : '';

                            cell.setAttribute('id', getDayCellID(flattened[_i]));
                            cell.className = _defaults.dayCellClass + ' ' + inMonth + ' ' + isToday;
                            cell.innerHTML = '<span class="date-num">'+flattened[_i].format('DD')+'<small>'+flattened[_i].format('MMM')+'</small></span>';

                            docFragment.appendChild(cell);
                        }

                        docFrags[cacheKey] = docFragment;
                    }

                    // Return a CLONED instance of the document fragment
                    return docFrags[cacheKey].cloneNode(true);
                }


                return {
                    restrict: 'A',
                    scope: {
                        settings:   '=calendry',
                        sharedCtrl: '=?'
                    },
                    replace: true,
                    templateUrl: 'template/calendry',
                    transclude: true,
                    terminal: true,
                    controller: ['$scope', function( $scope ){
                        $scope.forceListView = false;

                        // Initialize settings by merging in defaults
                        $scope.settings = angular.extend(_defaults, ($scope.settings || {}));

                        // Gets called automatically on init with a valid moment
                        $scope.$watch('settings.currentMonth', function(){
                            $scope.monthMap = getMonthMap( $scope.settings.currentMonth );
                        });

                        // Go to previous month
                        $scope.prevMonth = function(){
                            $scope.settings.currentMonth = MomentJS($scope.settings.currentMonth).subtract({months:1});
                        };

                        // Go to next month
                        $scope.nextMonth = function(){
                            $scope.settings.currentMonth = MomentJS($scope.settings.currentMonth).add({months:1});
                        };

                        // Go to current month
                        $scope.currentMonth = function(){
                            $scope.settings.currentMonth = MomentJS();
                        };

                        // Toggle list view
                        $scope.toggleListView = function(){
                            $scope.forceListView = !$scope.forceListView;
                        };

                        ////////////////////////////////////////////////////////////////////////
                        // Methods that should be publicly accessible on the Controller instance
                        ////////////////////////////////////////////////////////////////////////
                        this.getScope = function(){
                            return $scope;
                        };

                        this.getCurrentMonthMap = function(){
                            return $scope.monthMap;
                        };

                        this.getSettings = function(){
                            return $scope.settings;
                        };

                        this.setEvents = function( eventList ){
                            $scope.events = eventList;
                        };
                    }],
                    link: function( $scope, $element, attrs, Controller, transcludeFn ){

                        /**
                         * Set controller instance as a property on the scope so things
                         * outside the directive can use it.
                         * @type {*}
                         */
                        $scope.sharedCtrl = Controller;


                        /**
                         * Pass in the directive element and the monthMap we use to generate the
                         * calendar DOM elements. Returns a promise so we can chain it - such that DOM
                         * manipulation takes place, THEN something else (even though DOM is syncronous, makes
                         * the syntax easier :)
                         * @param $element
                         * @param monthMap
                         * @returns {promise|Q.promise}
                         */
                        function renderCalendarLayout( monthMap ){
                            // Rebuild the calendar layout (no events attached, just days)
                            var deferred  = $q.defer(),
                                $renderTo = angular.element($element[0].querySelector('.calendar-render')), //$element.find('section'),
                                weekRows  = Math.ceil( monthMap.calendarDayCount / 7 );

                            // Set row classes on <section>
                            $element.find('section').removeClass('week-rows-4 week-rows-5 week-rows-6')
                                .addClass('week-rows-' + weekRows);

                            // Render the calendar body
                            $renderTo.empty().append( getCalendarFragment(monthMap) );

                            // Resolve
                            deferred.resolve();

                            return deferred.promise;
                        }


                        /**
                         * Receive an event list as an array, and update the UI.
                         * @param eventList array
                         */
                        function renderEvents( eventList ){
                            // Clear all previously rendered events
                            angular.element($element[0].querySelectorAll('.event-cell')).remove();

                            // Variables
                            var flattened = [].concat.apply([], $scope.monthMap.calendarDays),
                                mapped    = {};

                            // Loop through every event object and create _moment property, and
                            // append to mapped
                            eventList.forEach(function(eventObj){
                                eventObj._moment = MomentJS(eventObj.start);
                                var mappedKey    = eventObj._moment.format(_eventMapKey);
                                if( ! mapped[mappedKey] ){
                                    mapped[mappedKey] = [];
                                }
                                mapped[eventObj._moment.format(_eventMapKey)].push(eventObj);
                            });

                            // Loop through every day in the calendar and look for events to
                            // render
                            flattened.forEach(function( dayMoment ){
                                var eventsForDay = mapped[dayMoment.format(_eventMapKey)];
                                if( eventsForDay ){
                                    var $dayNode = angular.element($element[0].querySelector('#' + getDayCellID(dayMoment)));
                                    if( $dayNode ){
                                        for(var _i = 0, _len = eventsForDay.length; _i < _len; _i++){
                                            var $newScope       = $scope.$new(/*true*/);
                                            $newScope.eventObj  = eventsForDay[_i];
                                            transcludeFn($newScope, function( $cloned ){
                                                $dayNode.append($cloned);
                                            });
                                        }
                                    }
                                }
                            });
                        }


                        // Any time the monthMap model changes, re-render.
                        $scope.$watch('monthMap', function( monthMapObj ){
                            if( monthMapObj ){
                                renderCalendarLayout(monthMapObj).then(function(){
                                    if( angular.isFunction($scope.settings.onMonthChange) ){
                                        $scope.settings.onMonthChange.apply(Controller);
                                    }
                                });
                            }
                        });


                        // Watch for changes to events property
                        $scope.$watch('events', function(eventList){
                            if( angular.isArray(eventList) ){
                                renderEvents(eventList);
                            }
                        });
                    }
                };
            }
        ]);

})( window, window.angular );