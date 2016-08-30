
weatherForecastApp.directive('searchResult', function () {
    return {
        templateUrl: 'directives/searchresult.html',
        replace: false,
        scope: {
            weatherObject: "=",
            convertCelsius: "&",
            convertFahrenheit: "&",
            convertDate: "&",
            dateFormat: "@"
        },
        link: function(scope, elems, attrs) {
            console.log(elems);
            console.log(attrs);
            return
        }}
});