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
        .when ('/second/:days', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })

});