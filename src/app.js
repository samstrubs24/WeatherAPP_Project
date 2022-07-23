let date = new Date();
let hours = date.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let day = days[date.getDay()];
let dateElement = document.querySelector("#update");
dateElement.innerHTML = ` Last updated:${day}, ${hours}: ${minutes}`;
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
