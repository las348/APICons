// Once document is loaded
$(document).ready(function () {
    var appID = "7b4ef69a93eea74ccb01a31e9ab6026a";
    
    // Current date formatted 
    var NowMoment = moment();
    var currentDay = NowMoment.format("dddd, MMMM Do YYYY");

    var savedcitiesArr = [];

    // Get Previous data
    getPrevCities();

    // City value entered
    var city = "";

    // Submit button
    $(".submit").on("click", function (event) {
        event.preventDefault();

        city = $("#city").val();
        city = city.toUpperCase();

        if (city !== "" && savedcitiesArr.indexOf(city) === -1) {
            savedcitiesArr.push(city);
        }

        weatherForecast();
        saveData();
        displayPrevCities();
    });

    // local storage
    function saveData() {
        localStorage.setItem("savedCities", JSON.stringify(savedcitiesArr));
    }

    function getPrevCities() {
        var storedCities = localStorage.getItem("savedCities");

        if (storedCities) {
            savedcitiesArr = JSON.parse(storedCities);
        }

        displayPrevCities();
    }

    // Display previous cities
    function displayPrevCities() {
        var cities = $(".list-group");

        // Clear old list before appending
        cities.text("");

        for (var i = 0; i < savedcitiesArr.length; i++) {
            var newCity = savedcitiesArr[i];

            var cityBtn = $("<button>");
            cityBtn.addClass("list-group-item list-group-item-action");
            cityBtn.text(newCity);

            cities.prepend(cityBtn);
        }
    }

    // City button
    $(document).on("click", ".list-group-item", function () {
        city = $(this).text();
        weatherForecast();
    });


    function weatherForecast() {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appID;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Get data for today's weather
            $(".city").html(response.name);
            $(".date").html(currentDay);
            $("#current-icon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

            $("#description_weather").html(response.weather[0].description);

            var tempF = parseInt((response.main.temp - 273.15) * 1.80 + 32);
            // console.log(tempF);
            $("#temp").html(tempF);
            console.log(tempF);

            $("#humidity").html(response.main.humidity);
            $("#wind").html(response.wind.speed);
            $("#pressure").html(response.main.pressure);

            lat = response.coord.lat;
            lon = response.coord.lon;
            var futureWeather = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + appID;

            $.ajax({
                url: futureWeather,
                method: "GET",
            })
                .then(function (response) {
                    console.log(response);

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

                    //6 Day Forecast Dates
                    var day0 = NowMoment.add(1, 'day').format('MM/DD');
                    var day1 = NowMoment.add(1, 'day').format('MM/DD');
                    var day2 = NowMoment.add(1, 'day').format('MM/DD');
                    var day3 = NowMoment.add(1, 'day').format('MM/DD');
                    var day4 = NowMoment.add(1, 'day').format('MM/DD');
                    var day5 = NowMoment.add(1, 'day').format('MM/DD');
                   
                    $(".forecast").text("6 Day Forecast");
                    $(".mb-4").removeClass("hide");                
                    $(".mb-4").addClass("showForecast");

                    // Convert the temp to fahrenheit
                    var temp0 = parseInt((response.daily[0].temp.day - 273.15) * 1.80 + 32);
                    var temp1 = parseInt((response.daily[1].temp.day - 273.15) * 1.80 + 32);
                    var temp2 = parseInt((response.daily[2].temp.day - 273.15) * 1.80 + 32);
                    var temp3 = parseInt((response.daily[3].temp.day - 273.15) * 1.80 + 32);
                    var temp4 = parseInt((response.daily[4].temp.day - 273.15) * 1.80 + 32);
                    var temp5 = parseInt((response.daily[5].temp.day - 273.15) * 1.80 + 32);

                    $(".future").addClass("city-info data");

                    var div = $("<div>");
                    $(".day0").text(day0);
                    div.text("Temp: " + temp0 + "\xB0F" + " Humidity: " + response.daily[0].humidity);
                    $("#day0").empty().append(div);
                    $("#fcImage0").attr("src", "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    $(".day1").text(day1);
                    div.text("Temp: " + temp1 + "\xB0F" + " Humidity: " + response.daily[1].humidity);
                    $("#day1").empty().append(div);
                    $("#fcImage1").attr("src", "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    $(".day2").text(day2);
                    div.text("Temp: " + temp2 + "\xB0F" + " Humidity: " + response.daily[2].humidity);
                    $("#day2").empty().append(div);
                    $("#fcImage2").attr("src", "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    $(".day3").text(day3);
                    div.text("Temp: " + temp3 + "\xB0F" + " Humidity: " + response.daily[3].humidity);
                    $("#day3").empty().append(div);
                    $("#fcImage3").attr("src", "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    $(".day4").text(day4);
                    div.text("Temp: " + temp4 + "\xB0F" + " Humidity: " + response.daily[4].humidity);
                    $("#day4").empty().append(div);
                    $("#fcImage4").attr("src", "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png");

                    var div = $("<div>");
                    $(".day5").text(day5);
                    div.text("Temp: " + temp5 + "\xB0F" + " Humidity: " + response.daily[5].humidity);
                    $("#day5").empty().append(div);
                    $("#fcImage5").attr("src", "http://openweathermap.org/img/wn/" + response.daily[5].weather[0].icon + "@2x.png");

                }); //forecast api
           
        }); //1st api



    }; //current data


});



