// uses weather api
// api key: 073e079ab3a74f10a1010601222512

class WeatherReport {
    // constructs a weather report of the weather 
    // containing weather info for <num_days> days
    constructor() {
        this.date = Date();
        this.weather = null;
    }

    // gets current location of user
    get_loc() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, handleError);
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
    }

    // fetch the weather info for the user's location
    fetch_weather_data() {
        const fetch = require("node_fetch");
        const cheerio = require("cheerio");
        const api = ""
        
    }

    // interprets weather data
    interpret_weather() {

    }

}
