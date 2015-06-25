var dataGeekApp = angular.module('dataGeekApp', ['chart.js']);

dataGeekApp.
controller('dashboardCtrl', ['$scope', 'eventHttpService',
    function($scope, eventHttpService) {
  var totalEvents = [], selectedEvents = [];

  angular.extend($scope, {
    eventQueryText: '',
    results: [],
    metricType: '',
    customSetMetrics: [],
    customSetLabels: [],
    customSetToS: [],
    subpageMetrics: [],
    subpageLabels: [],
    subpageToS: [],
    isMerged: false
  });

  angular.extend($scope, {
    clickToS: function() {
      $scope.metricType = 'ToS';

      $scope.customSetMetrics = [{workflow: 'Geo', tos: 10}, {workflow: 'Daypart', tos: 20}];
      $scope.customSetLabels = _.pluck($scope.customSetMetrics, 'workflow');
      $scope.customSetToS = [_.pluck($scope.customSetMetrics, 'tos')];
      $scope.customSetColor = ['#f16463'];

      $scope.subpageMetrics = [{workflow: 'Geo', tos: 30}, {workflow: 'Daypart', tos: 10}];
      $scope.subpageLabels = _.pluck($scope.subpageMetrics, 'workflow');
      $scope.subpageToS = [_.pluck($scope.subpageMetrics, 'tos')];
      $scope.subpageColor = ['#46b6ae'];
    },
    clickTSSR: function() {

    },
    clickAR: function() {

    },
    clickMerge: function() {
      $scope.isMerged = true;

      $scope.mergedLabels = _.pluck($scope.customSetMetrics, 'workflow');
      $scope.mergedColors = ['#f16463', '#46b6ae'];

      switch ($scope.metricType) {
        case 'ToS':
          $scope.mergedToS = [
              _.pluck($scope.customSetMetrics, 'tos'),
              _.pluck($scope.subpageMetrics, 'tos')
          ];
      }
    },
    submitEventQuery: function() {
      eventHttpService.getEvents(function(data) {
        totalEvents = data;
        $scope.results = $scope.eventQueryText ?
                         _.filter(totalEvents, JSON.parse($scope.eventQueryText)) :
                         totalEvents;
      });
    }
  });
}]).
service('eventHttpService', ['$http', function($http) {
  this.getEvents = function(onSuccess, onError) {
    $http.get('/events').success(onSuccess);
  };
}]);
