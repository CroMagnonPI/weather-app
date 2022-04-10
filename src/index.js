function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  //search city
  function searchCities(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-search-input");
    let displayCity = document.querySelector("#city");
    displayCity.innerHTML = cityInput.value;
  }
  
  let searchCitiesForm = document.querySelector("#search-form");
  searchCitiesForm.addEventListener("submit", searchCities);
  
  let now = new Date();
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(now);
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", searchCities);
  
  //update weather
  function getWeatherInfo(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#current-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#high-temp").innerHTML = Math.round(
      response.data.main.temp_max
    );
    document.querySelector("#low-temp").innerHTML = Math.round(
      response.data.main.temp_min
    );
    document.querySelector("#wind-speed").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#wind-speed").innerHTML = Math.round(
      response.data.main.humidity
    );
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].description;
    document.querySelector("#precipitation").innerHTML = response.data.clouds.all;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  }
  
  function searchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "d965f5e3fcb1a2054c7f5ac431fe9773";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(getWeatherInfo);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let locationButton = document.querySelector("#get-current-location");
  locationButton.addEventListener("click", getCurrentLocation);
  
  function searchCity(city) {
    let apiKey = "d965f5e3fcb1a2054c7f5ac431fe9773";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(getWeatherInfo);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-search-input").value;
    searchCity(city);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  searchCity("Seattle");
  
  //temp conversion//
  function convertToCelsius(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = 19;
  }
  let unitCelsius = document.querySelector("#unitC");
  let tempC = Math.round(((59 - 32) * 5) / 9);
  celciusTemp.innerHTML = tempC;
  unitCelsius.addEventListener("click", convertToCelsius);
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#current-temp");
    let fahrenheitTemp = document.querySelector("#farh-to-cel");
    let tempF = Math.round((15 * 9) / 5 + 32);
    fahrenheitTemp.innerHTML = tempF;
  }
  let unitFahrenheit = document.querySelector("#unitF");
  unitFahrenheit.addEventListener("click", convertToFahrenheit);
