var dataGeekApp = angular.module('dataGeekApp', ['chart.js']);

dataGeekApp.
controller('dashboardCtrl', ['$scope', 'eventHttpService',
    function($scope, eventHttpService) {
  angular.extend($scope, {
    eventQueryText: '',
    events: [
      {
        workflow: 'Geo',
        sessionID: 1000,
        timestamp: 20140109,
        accountID: 'JieC',
        componentID: 'segmentEditLink',
        eventType: 'click'
      },
      {
        workflow: 'Segment',
        sessionID: 2000,
        timestamp: 20150124,
        accountID: 'AmandaL',
        componentID: 'segmentEditLink',
        eventType: 'mouse over'
      }]
  });

  angular.extend($scope, {
    submitEventQuery: function() {
      var eventQueryObj;

      if (!$scope.eventQueryText) { return; }

      eventQueryObj = JSON.parse($scope.eventQueryText);

      eventHttpService.getEvents(function(data) {
        $scope.events = data;
      });
    }
  });

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
}]).
service('eventHttpService', ['$http', function($http) {
  this.getEvents = function(onSuccess, onError) {
    $http.get('/events').success(onSuccess).error(onError);
  };
}]);
