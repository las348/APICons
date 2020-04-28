$(document).ready(function () {
    var appID = "7b4ef69a93eea74ccb01a31e9ab6026a";

    $(".query_btn").click(function () {

        var query_param = $(this).prev().val();

        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/forecast?q=" + query_param + "&APPID=" + appID;
            console.log(weather);
            // } else if ($(this).prev().attr("placeholder") == "Zip Code") {
            //     var weather = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=" + query_param + "&APPID=" + appID;
            //     console.log(weather);
        }

        $.getJSON(weather, function (json) {
            $("#city").html(json.city.name);
            $("#date").html(json.name);
            //Moment.js
            var NowMoment = moment();
            //today's date   
            var today = NowMoment.format("dddd, MMMM Do YYYY");
            console.log(today);
            $('#date').text(today);

            $("#description_weather").html(json.list[0].weather[0].description);

               $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png");

            // Convert the temp to fahrenheit
            var tempF = parseInt((json.list[0].main.temp - 273.15) * 1.80 + 32);
            $("#temperature").html(tempF + "\xB0 F");

              $("#humidity").html(json.list[0].main.humidity);
              $("#wind").html(json.list[0].wind.speed);
                         $("#pressure").html(json.list[0].main.pressure);
               //  $("#uv").html(json.);
               

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