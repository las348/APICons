$(document).ready(function () {
    var appID = "7b4ef69a93eea74ccb01a31e9ab6026a";

    $(".query_btn").click(function () {

        var query_param = $(this).prev().val();

        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;
            console.log(weather);
        } else if ($(this).prev().attr("placeholder") == "Zip Code") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&APPID=" + appID;
            console.log(weather);
        }
 
    $.getJSON(weather, function (json) {
        $("#city").html(json.name);
        $("#date").html(json.name);
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
        var tempF = parseInt(json.main.temp - 273.15) * 1.80 + 32;
        $("#temperature").html(tempF + "\xB0 F");

        $("#humidity").html(json.main.humidity);
        $("#wind").html(json.wind.speed);
      //  $("#uv").html(json.wind.speed);
        $("#pressure").html(json.main.pressure);
        
    });
})

// Optional Code for temperature conversion
var fahrenheit = true;

$("#convertToCelsius").click(function () {
    if (fahrenheit) {
        $("#temperature").text(((($("#temperature").text() - 32) * 5) / 9));
    }
    fahrenheit = false;
    console.log(fahrenheit);
});

$("#convertToFahrenheit").click(function () {
    if (fahrenheit == false) {
        $("#temperature").text((($("#temperature").text() * (9 / 5)) + 32));
    }
    fahrenheit = true;
});


});