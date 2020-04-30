$(document).ready(function () {
    var appID = "7b4ef69a93eea74ccb01a31e9ab6026a";

    //Capture city & zip input
    var city = $("#cityInput").val();
    var zip = $("#zipInput").val();
    var history = $("#history");
    console.log(city);
    localStorage.setItem(history, city);
    localStorage.setItem(history, zip);
   

    $(".query_btn").click(function () {

        var query_param = $(this).prev().val();

        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;
        } else if ($(this).prev().attr("placeholder") == "Zip Code") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&APPID=" + appID;
        }
        console.log(weather);


        $.getJSON(weather, function (json) {
            //Curent weather info
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


            //Second API for forecast
            var lat = json.coord.lat;
            var lon = json.coord.lon;
            var futureWeather = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + appID;

            $.ajax({
                url: futureWeather,
                method: "GET"
            })
                .then(function (response) {
                    // console.log(futureWeather);
                    console.log(response);

                    // Current UVI and Color response
                    console.log(response.current.uvi);
                    var uvi = (response.current.uvi);
                    $("#uv").html(uvi);
                    if (uvi <= 2) {
                        $("#uv").css("background-color: #green");
                    } if (uvi <= 5) {
                        $("#uv").css("background-color: #yellow");
                    } if (uvi <= 7) {
                        $("#uv").css("background-color: #orange");
                    } if (uvi <= 10) {
                        $("#uv").css("background-color", 'red');
                    } if (uvi > 10) {
                        $("#uv").css("background-color", 'violet');
                      //  alert("Extreme risk of harm from unprotected Sun exposure. Take all precautions.")
                    };

                    //5 Day Forecast Dates
                    var day0 = NowMoment.add(1, 'day').format('MM/DD');
                    var day1 = NowMoment.add(1, 'day').format('MM/DD');
                    var day2 = NowMoment.add(1, 'day').format('MM/DD');
                    var day3 = NowMoment.add(1, 'day').format('MM/DD');
                    var day4 = NowMoment.add(1, 'day').format('MM/DD');
                    console.log(day4)

                    // console.log(response.daily[0].temp.day); //temp 
                    // console.log(response.daily[0].weather[0].icon); //icon 
                    // console.log(response.daily[0].humidity); //humidity 

                    // 5 day forecast with an icon representation of weather conditions, the temperature, and the humidity.
                    $(".forecast").text("5 Day Forecast");

                    // Convert the temp to fahrenheit
                    var temp0 = parseInt((response.daily[0].temp.day - 273.15) * 1.80 + 32);
                    var temp1 = parseInt((response.daily[1].temp.day - 273.15) * 1.80 + 32);
                    var temp2 = parseInt((response.daily[2].temp.day - 273.15) * 1.80 + 32);
                    var temp3 = parseInt((response.daily[3].temp.day - 273.15) * 1.80 + 32);
                    var temp4 = parseInt((response.daily[4].temp.day - 273.15) * 1.80 + 32);

                    var div = $("<div>");
                    div.text(day0 + " Temp: " + temp0 + "\xB0 F" + " Humidity: " + response.daily[0].humidity);
                    $("#day0").append(div);
                    $("#fcImage0").attr("src", "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    div.text(day1 + " Temp: " + temp1 + "\xB0 F" + " Humidity: " + response.daily[1].humidity);
                    $("#day1").append(div);
                    $("#fcImage1").attr("src", "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    div.text(day2 + " Temp: " + temp2 + "\xB0 F" + " Humidity: " + response.daily[2].humidity);
                    $("#day2").append(div);
                    $("#fcImage2").attr("src", "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    div.text(day3 + " Temp: " + temp3 + "\xB0 F" + " Humidity: " + response.daily[3].humidity);
                    $("#day3").append(div);
                    $("#fcImage3").attr("src", "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    div.text(day4 + " Temp: " + temp4 + "\xB0 F" + " Humidity: " + response.daily[4].humidity);
                    $("#day4").append(div);
                    $("#fcImage4").attr("src", "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png");

                    //Search History
                    // if 
                    $("$history").text("Search History");
                    
                    var div = $("<div>");
                    div.append(localStorage.getItem(city));
                    div.append(localStorage.getItem(zip));
                    

                    // Clear all items
                    // localStorage.clear();
                })

        });

    })





});