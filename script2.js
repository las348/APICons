$(document).ready(function () {
    var appID = "7b4ef69a93eea74ccb01a31e9ab6026a";

    $(".query_btn").click(function () {

        var query_param = $(this).prev().val();

        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;
        } else if ($(this).prev().attr("placeholder") == "Zip Code") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&APPID=" + appID;
        }
        console.log(weather);


        $.getJSON(weather, function (json) {
            $("#city").html(json.name);

            //Moment.js
            var NowMoment = moment();
            //today's date   
            var today = NowMoment.format("dddd, MMMM Do YYYY");
            console.log(today);
            $('#date').text(today);

            $("#main_weather").html(json.weather[0].main);
            $("#description_weather").html(json.weather[0].description);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
           
// Convert the temp to fahrenheit
var tempF = parseInt((json.main.temp - 273.15) * 1.80 + 32);
$("#temperature").html(tempF + "\xB0 F");

            $("#pressure").html(json.main.pressure);
            $("#humidity").html(json.main.humidity);
            $("#wind").html(json.wind.speed);

//Second API
            var lat = json.coord.lat;
            var lon = json.coord.lon;
            var futureWeather = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + appID;
            
            if (2 === 2) {
                $.ajax({
                    url: futureWeather,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(futureWeather);
                        console.log(response);
                    })
            }

        });
    })


});