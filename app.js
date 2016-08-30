

var weatherForecastApp = angular.module('weatherForecastApp', ['ngRoute', 'ngResource']);

weatherForecastApp.config(function ($routeProvider) {
    $routeProvider
        .when ('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
        .when ('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
    })

});


weatherForecastApp.controller('mainController', ['$scope', 'binderService', function($scope, binderService) {
    $scope.city = binderService.city;
    $scope.days = binderService.dayCount;

    $scope.$watch('city', function () {
        binderService.city = $scope.city;
    });
    $scope.$watch('days', function () {
        binderService.dayCount = $scope.days;
    })
}]);

weatherForecastApp.controller('secondController', ['$scope', '$resource', 'binderService', '$routeParams', function ($scope, $resource, binderService, $routeParams) {

    $scope.city = binderService.city;
    $scope.weatherAPI =
        $resource('http://api.openweathermap.org/data/2.5/forecast/daily', {
        callback: "JSON_CALLBACK"
    }, {get: {method: "JSONP"}});
    $scope.days = binderService.dayCount;

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appId: '1be079e4d2e906ac71313a709c15b59f' });

    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    };
    $scope.convertToCelsius = function (degK) {
        return Math.round(degK - 272.15);
    };

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }

    console.log($scope.weatherResult);


}]);

weatherForecastApp.service('binderService', function() {
    this.city = 'Tychy, Silesia';
    this.dayCount = 3;
});