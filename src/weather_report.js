class WeatherReport {
  // constructs a weather report of the next num_days days for the given location
  // handles updating news report elements relating to the weather
  constructor(latitude, longitude, num_days) {
    // initialize attributes
    this.latitude = latitude;
    this.longitude = longitude;
    this.days = num_days;
    this.raw_data = null;
    this.fetchWeather();

    // get weather display elements from webpage
    const daily_display = document.querySelector("#new.popup #daily_weather");
    const hourly_display = document.querySelector("#new.popup #hourly_weather");
  }

  // fetches weather data from weather api
  fetchWeather() {
    // make request to weather api
    const key = "073e079ab3a74f10a1010601222512";
    const base_url = "http://api.weatherapi.com/v1/";
    const api = "forecast.json";
    const request = new XMLHttpRequest();
    request.open("GET", 
    base_url + api + `?key=${key}&q=${this.latitude},${this.longitude}&days=${this.days}`);
    request.send();

    // handle successful request
    request.onload = function() {
      if (request.status != 200) {
        alert(`Error ${request.status}: ${request.statusText}\n${request.responseText}`)
      }
      this.raw_data = JSON.parse(request.response);
      console.log(JSON.stringify(this.raw_data));
    }
  }

  // returns whether weather data was successfully retrieved
  getSuccess() {
    return this.raw_data != null;
  }

  // updates daily weather in news report
  updateDaily(day_index) {
    const data = this.raw_data["forecast"]["forecastday"][day_index]["day"];
    const text = 
    `Maximum Temperature: ${data["maxtemp_c"]}°C/${data["maxtemp_f"]}°F
    Minimum Temperature: ${data["mintemp_c"]}°C/${data["mintemp_f"]}°F
    Average Temperature: ${data["avgtemp_c"]}°C/${data["avgtemp_f"]}°F
    Chance of Rain: ${data["daily_chance_of_rain"]}   Total Precipitation: ${data["totalprecip_mm"]}mm
    Chance of Snow: ${data["daily_chance_of_snow"]}   Total Snow: ${data["totalsnow_cm"]}cm
    Weather: ${data["condition"]["text"]}`;
    daily_display.innerHTML = text;
  }

  // updates hourly weather in news report
  updateHourly(day_index, hour_index) {
    const report = this.raw_data["forecast"]["forecastday"][day_index]["hour"][hour_index];
    const text = 
    `Temperature: ${data["temp_c"]}°C/${data["temp_f"]}°F
    Feels like: ${data["feelslike_c"]}°C/${data["feelslike_f"]}°F
    Weather: ${data["condition"]["text"]}
    `
  }

  // returns whether it is daytime at the given hour
  isDay(day_index, hour_index) {
    return this.raw_data["forecast"]["forecastday"][day_index]["hour"][hour_index]["is_day"] == 1;
  }

  // returns whether there is rain at the current hour
  isRainy(day_index, hour_index) {
    return this.raw_data["forecast"]["forecastday"][day_index]["hour"][hour_index]["condition"]["will_it_rain"] == 1;
  }

  // returns whether there is snow at the current hour
  isSnowy(day_index, hour_index) {
    return this.raw_data["forecast"]["forecastday"][day_index]["hour"][hour_index]["condition"]["will_it_snow"] == 1;
  }

  // returns whether there are clouds at the current hour
  isCloudy(day_index, hour_index) {
    return this.raw_data["forecast"]["forecastday"][day_index]["hour"][hour_index]["condition"]["cloud"] >= 30;
  }

  // returns whether there is fog at the current hour
  isFoggy(day_index, hour_index) {
    const weather = this.raw_data["forecast"]["forecastday"][day_index]["hour"][hour_index]["condition"]["text"];
    return weather.toLowerCase().includes("Fog") || weather.toLowerCase().includes("Mist");
  }

}