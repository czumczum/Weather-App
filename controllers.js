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

weatherForecastApp.controller('secondController', ['$scope', 'binderService', '$routeParams', '$log', 'weatherService', function ($scope, binderService, $routeParams, $log, weatherService) {

    //API configuration
    $scope.city = binderService.city;
    $scope.days = $routeParams.days || binderService.dayCount;
    $scope.maxDays = 6; //max number of days when forecast are shown in one row

    $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);

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
