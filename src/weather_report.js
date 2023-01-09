// uses weather api
// api key: 073e079ab3a74f10a1010601222512

class WeatherReport {
  // constructs a weather report of the next 7 days for the given location
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.data = null;   
    // this.fetch_weather();
  }

  fetchWeather() {
    // make request to weather api
    const key = "073e079ab3a74f10a1010601222512";
    const base_url = "http://api.weatherapi.com/v1/";
    const api = "forecast.json";
    const request = new XMLHttpRequest();
    request.open("GET", 
    base_url + api + `?key=${key}&q=${this.latitude},${this.longitude}`);
    request.send();

    // handle successful request
    request.onload = function() {
      if (request.status != 200) {
        alert(`Error ${request.status}: ${request.statusText}\n${request.responseText}`)
      }
      this.data = JSON.parse(request.response);
    }
  }

  getWeather() {}

}