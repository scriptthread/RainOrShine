(function($) {
    $(document).ready(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                
                var appId = "719c0e3ddffc66ee4f37c666b1f24546";
                var weatherURL = "//api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + appId + "&units=metric";
                console.log(weatherURL);
                
                $.ajax({
                  dataType: "json",
                  url: weatherURL,
                  success: function(result) {
                      // save weather data from coordinates
                      var weatherData = JSON.stringify(result);
                      // log data to console
                      var parseData = JSON.parse(weatherData);
                      console.log(parseData);
                      console.log(weatherData);
                      // set variables
                      var city = result.name;
                      var country = result.sys.country;
                      var temperature = result.main.temp;
                      var currentTemp = "°C";
                      var condition = result.weather[0].description;
                      var imgIcon = result.weather[0].icon;
                      
                      // weather description and icon image
                      $("#condition").html(condition + "<img src='http://openweathermap.org/img/w/" + imgIcon +".png'>");
                      // Set Country and City
                      $("#location").html(city + ", " + country);
                      $("#temp").html(temperature + " " + currentTemp);
                      // toggle °F and °C
                      $("button").on("click", function() {
                        if(currentTemp === "°C") {
                            currentTemp = "°F";
                            newtemperature = (1.8 * temperature + 32).toFixed(2);
                            $("button").html("°C");
                            $("#temp").html(newtemperature + " " + currentTemp);
                        } else if(currentTemp === "°F") {
                            currentTemp = "°C";
                            $("#temp").html(temperature + " " + currentTemp);
                            $("button").html("°F");
                        }
                      }); 
                      
                      
                      
                      
                  }
                });
            });
        }
    });
})(jQuery);