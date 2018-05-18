$(document).ready(function(){

    var apiKey = 'a69ddd1babda783908fe909ac525d33e',
	    apiUrl,
        lat,
        lon,
        response; //msg put on the website


    //checking for geolocation to get current coordinates of the device
    if ("geolocation" in navigator) {
        //geolocation is supported
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        $('.container').append('<p class="error">Geolocation is not suported, please type in the city name.</p>');
    }

    function success(location) {
        lat = location.coords.latitude;
        lon = location.coords.longitude;

        apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=a69ddd1babda783908fe909ac525d33e';
        console.log(apiUrl);
  
    }// end success function

    function fail(error) {
        $('.container').append('<div class="content"><p class="error">We were unable to get your position, please type in the city name.</p></div>');
    } // end fail message




    //on button click check the weather
    $('#checkBtn').on('click', function(){
        
        $('.content').remove(); //removes previus weather info
        $('.error').remove();  //removes all error messages

        console.log(lat, lon);

        //checking if the input text field id filled 
        if ($("#cityInput").val().length > 0){
            var city = $("#cityInput").val();
            apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=a69ddd1babda783908fe909ac525d33e';
        } else if (lat === undefined && lon === undefined){
            $('.container').append('<p class="error">Please type in the city name because geolocation is not supported</p>');
        }


        //ajax call to the open weather map server
        $.ajax( {
            url: apiUrl,
            method: "GET",
            dataType: "json",
            async: "false",
            success: function(data) {
                var icon = data.weather[0].icon;
                var iconSrc = 'http://openweathermap.org/img/w/' + icon + '.png';
                response = '<div class="content"><ul>';
                response += '<li><span>City:</span> ' + data.name + '</li>';
                response += '<li><span>Temp: </span> ' + data.main.temp + ' &deg;C</li>';
                response += '<img src="' + iconSrc + '" alt="weather icon"></li>';
                response += '<li><span>Weather:</span> ' + data.weather[0].description + "</li>";
                response += '</ul></div>';
                
                $('.container').append(response);
            },
            error: function(jqXHR) {
                response = '<p class="error">There was an error: ' + jqXHR.status + ", " + jqXHR.statusText + "</p>";
                $('.container').append(response);
            }
        });

        $('#cityInput').val("");  //removes text from input text field

    }); //end button click

}); //end document ready