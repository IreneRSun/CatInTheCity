class WeatherReport {
  // constructs a weather report of the next num_days days for the given location
  // handles updating news report elements relating to the weather
  constructor(latitude, longitude, num_days) {
    // initialize attributes
    this.latitude = latitude;
    this.longitude = longitude;
    this.days = num_days;
    this.raw_data = null;

    // get weather display elements from webpage
    this.daily_display = document.querySelector("#news.popup #daily_weather");
    this.hourly_display = document.querySelector("#news.popup #hourly_weather");
  }

  // fetches weather data from weather api
  fetchWeather() {
    // make request to weather api
    const key = "073e079ab3a74f10a1010601222512";
    const base_url = "http://api.weatherapi.com/v1/";
    const api = "forecast.json";
    const request = new XMLHttpRequest();
    request.open("GET", 
    base_url + api + `?key=${key}&q=${this.latitude},${this.longitude}&days=${this.days}`, false);
    request.send();

    // handle request
    request.onload = function() {
      if (request.status != 200) {
        alert(`Error ${request.status}: ${request.statusText}\n${request.responseText}`)
      }
    }
    this.raw_data = JSON.parse(request.response)["forecast"]["forecastday"];
  }

  // updates daily weather in news report
  updateDaily(day_index) {
    if (this.raw_data != null) {
      const data = this.raw_data[day_index]["day"];
      const text = 
      `<strong>Maximum Temperature:</strong> ${data["maxtemp_c"]}°C/${data["maxtemp_f"]}°F </br>
      <strong>Minimum Temperature:</strong> ${data["mintemp_c"]}°C/${data["mintemp_f"]}° </br>
      <strong>Average Temperature:</strong> ${data["avgtemp_c"]}°C/${data["avgtemp_f"]}°F </br>
      <strong>Chance of Rain:</strong> ${data["daily_chance_of_rain"]}% </br> 
      <strong>Total Precipitation:</strong> ${data["totalprecip_mm"]}mm </br>
      <strong>Chance of Snow:</strong> ${data["daily_chance_of_snow"]}% </br> 
      <strong>Total Snow:</strong> ${data["totalsnow_cm"]}cm </br>
      <strong>Weather:</strong> ${data["condition"]["text"]}`;
      this.daily_display.innerHTML = text;
    }
  }

  // updates hourly weather in news report
  updateHourly(day_index, hour_index) {
    if (this.raw_data != null) {
      const data = this.raw_data[day_index]["hour"][hour_index];
      const text = 
      `<strong>Temperature:</strong> ${data["temp_c"]}°C/${data["temp_f"]}°F </br>
      <strong>Feels like:</strong> ${data["feelslike_c"]}°C/${data["feelslike_f"]}°F </br>
      <strong>Weather:</strong> ${data["condition"]["text"]}
      `
      this.hourly_display.innerHTML = text;
    }  
  }

  // returns whether it is daytime at the given hour
  isDay(day_index, hour_index) {
    if (this.raw_data != null) {
      return this.raw_data[day_index]["hour"][hour_index]["is_day"] == 1;
    }
  }

  // returns whether there is rain at the current hour
  isRainy(day_index, hour_index) {
    if (this.raw_data != null) {
      return this.raw_data[day_index]["hour"][hour_index]["chance_of_rain"] >= 50;
    }
  }

  // returns whether there is snow at the current hour
  isSnowy(day_index, hour_index) {
    if (this.raw_data != null) {
      return this.raw_data[day_index]["hour"][hour_index]["chance_of_snow"] >= 50;
    }
  }

  // returns whether there are clouds at the current hour
  isCloudy(day_index, hour_index) {
    if (this.raw_data != null) {
      return this.raw_data[day_index]["hour"][hour_index]["cloud"] >= 30;
    } 
  }

  // returns whether there is fog at the current hour
  isFoggy(day_index, hour_index) {
    if (this.raw_data != null) {
      const weather = this.raw_data[day_index]["hour"][hour_index]["condition"]["text"];
      return weather.toLowerCase().includes("Fog") || weather.toLowerCase().includes("Mist");
    }
  }

}