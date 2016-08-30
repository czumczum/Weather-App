weatherForecastApp.service('binderService', function() {
    this.city = 'Tychy, Silesia';
    this.dayCount = 3;
});

weatherForecastApp.service('weatherService', ['$resource', function ($resource) {
    this.GetWeather = function (city, days) {
        var weatherAPI =
            $resource('http://api.openweathermap.org/data/2.5/forecast/daily', {
                callback: "JSON_CALLBACK"
            }, {get: {method: "JSONP"}});

        return weatherAPI.get({q: city, cnt: days, appId: '1be079e4d2e906ac71313a709c15b59f'})
    }
}]);