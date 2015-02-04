angular.module('tyo-mobile').

    directive('checkboxList', function(){
        return {
            restrict: 'A',
            scope: {
                listData:       '=checkboxList',
                selectedItems:  '=selected'
            },
            templateUrl: 'template/checkbox-list',
            replace: true,
            transclude: true,
            link: function($scope, element, attrs){
                $scope.applySelection = function (item) {
                    if (!$scope.selectedItems) {
                        $scope.selectedItems = [];
                    }
                    var index = $scope.selectedItems.indexOf(item);
                    if (index !== -1) {
                        $scope.selectedItems.splice(index, 1);
                        return;
                    }
                    $scope.selectedItems.push(item);
                };
            }
        };
    });