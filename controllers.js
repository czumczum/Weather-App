weatherForecastApp.controller('mainController', ['$scope', 'binderService', '$location', function($scope, binderService, $location) {
    $scope.city = binderService.city;
    $scope.days = binderService.dayCount;

    $scope.$watch('city', function () {
        binderService.city = $scope.city;
    });
    $scope.$watch('days', function () {
        binderService.dayCount = $scope.days;
    });

    $scope.submit = function () {
        $location.path("/second");
    }
}]);

weatherForecastApp.controller('secondController', ['$scope', '$resource', 'binderService', '$routeParams', '$log', function ($scope, $resource, binderService, $routeParams, $log) {

    //API configuration
    $scope.city = binderService.city;
    $scope.days = $routeParams.days || binderService.dayCount;
    $scope.maxDays = 6; //max number of days when forecast are shown in one row

    $scope.weatherAPI =
        $resource('http://api.openweathermap.org/data/2.5/forecast/daily', {
            callback: "JSON_CALLBACK"
        }, {get: {method: "JSONP"}});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, appId: '1be079e4d2e906ac71313a709c15b59f' });

    //Display functions
    $scope.convertToFahrenheit = function (degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    };
    $scope.convertToCelsius = function (degK) {
        return Math.round(degK - 272.15);
    };
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };

    $log.info($scope.weatherResult);
}]);
