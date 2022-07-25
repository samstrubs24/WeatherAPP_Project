//changing background image based on time of day
let date = new Date();
let hours = date.getHours();
let hour = date.getHours();
let hourTime = date.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hours > 12) {
  hour = hours - 12;
  hourTime = "PM";
  document.getElementById("background").style.backgroundImage =
    "url(https://i.pinimg.com/564x/9b/78/c7/9b78c76ad7fd0392588fef31a6e7650e.jpg)";
  document.getElementById("temp").style.color = "#FFFFFF";
  document.getElementById("city").style.color = "#FFFFFF";
  document.getElementById("humidity").style.color = "#FFFFFF";
  document.getElementById("wind").style.color = "#FFFFFF";
  document.getElementById("celsius").style.color = "#FFFFFF";
  document.getElementById("fahren").style.color = "0000FF";
  document.getElementById("forecast").style.color = "#FFFFFF";
} else {
  hourTime = "AM";
  document.getElementById("background").style.backgroundImage =
    "url(https://i.pinimg.com/564x/a8/59/50/a8595064067a8567d05c283e90c23968.jpg)";
}
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let day = days[date.getDay()];
let dateElement = document.querySelector("#update");
dateElement.innerHTML = ` Last updated:${day}, ${hour}: ${minutes} ${hourTime}`;
//Forecast API code - need coordinates first and API url // get coordinates from API - response from Api - gives back coordinates , get corrdinates from api

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let describeElement = document.querySelector("#descript");
  describeElement.innerHTML = response.data.weather[0].main;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let humidityElement = document.querySelector("#humidity");
  let hum = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity:${hum}%`;
  let windElement = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind Speed: ${wind} mph`;
  let weatherIconElement = document.querySelector("#img1");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
  //forecast api
  //send coordinates to this function - displays info
  getForecast(response.data.coord);
}

//gets info from response with display temp and puts it into this function so the api can use lat and lon to find city

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a81ad5e4475c2b1dbce4aaa38b89d9cb";
  let apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiForecast);
  axios.get(apiForecast).then(displayForecast);
}

function search(city) {
  let apiKey = "a81ad5e4475c2b1dbce4aaa38b89d9cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handle(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  search(cityInput.value);
}

//bonus - fahrenheit/celsius conversion

function displayFahrenTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("celsius");
  fahrenLink.classList.add("celsius");
  let tempElement = document.querySelector("#temp");
  let fahrenTemperature = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("celsius");
  fahrenLink.classList.remove("celsius");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handle);

let fahrenLink = document.querySelector("#fahren");
fahrenLink.addEventListener("click", displayFahrenTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

//part of function for forecast loop
function convertDay(dates) {
  let date = new Date(dates * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}
//Java for forecast loop
function displayForecast(response) {
  let forecastDaily = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecastDaily.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `   
         <div class = "col-2">
  <div class = "Mon-forecast"> ${convertDay(day.dt)}  </div>
    <div>
 <img src = 'https://openweathermap.org/img/wn/${
   day.weather[0].icon
 }.png' alt = "cloudy" class = "weather-cloudy-icon" width ="45px" /> </div>
   <span class = "Max-temp"> ${Math.round(
     day.temp.max
   )} &deg; </span><span class = "Min-temp"> ${Math.round(
          day.temp.min
        )} &deg;</span>
  </div> 
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//bonus - current location button

//navigation needs a function so create function - showposition to find location

function showPosition(position) {
  let apiKey = "a81ad5e4475c2b1dbce4aaa38b89d9cb";
  let apiCoordToCity = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);
  axios.get(apiCoordToCity).then(changeToCity);
}

function changeToCity(response) {
  console.log(response.data);
  let h1Element = document.querySelector("h1");
  h1Element.innerHTML = `${response.data.name}`;
  let humTown = document.querySelector("#humidity");
  humTown.innerHTML = `Humidity: ${response.data.main.humidity}`;
  let windTown = document.querySelector("#wind");
  windTown.innerHTML = `wind: ${Math.round(response.data.wind.speed)} mph`;
  let descriptTown = document.querySelector("#descript");
  descriptTown.innerHTML = response.data.weather[0].main;
  let tempEl = document.querySelector("#temp");
  tempEl.innerHTML = Math.round(response.data.main.temp);
  getForecastCurrentLoc(response.data.coord);
}
//issue was happening because page would load before got latitude and try to run api without lat/lon
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

function getForecastCurrentLoc(coordinates) {
  console.log(coordinates);
  let apiKey = "a81ad5e4475c2b1dbce4aaa38b89d9cb";
  let apiForecastLocal = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiForecastLocal);
  axios.get(apiForecastLocal).then(displayForecastLocal);
}

//java for loop for forecast

function convertDayLocal(dates) {
  let date = new Date(dates * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}
//Java for forecast loop
function displayForecastLocal(response) {
  let forecastDaily = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecastDaily.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `   
         <div class = "col-2">
  <div class = "Mon-forecast"> ${convertDayLocal(day.dt)}  </div>
    <div>
 <img src = 'https://openweathermap.org/img/wn/${
   day.weather[0].icon
 }.png' alt = "cloudy" class = "weather-cloudy-icon" width ="45px" /> </div>
   <span class = "Max-temp"> ${Math.round(
     day.temp.max
   )} &deg; </span><span class = "Min-temp"> ${Math.round(
          day.temp.min
        )} &deg;</span>
  </div> 
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
