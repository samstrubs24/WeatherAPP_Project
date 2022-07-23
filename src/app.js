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
  console.log(response.data);
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

//Java for forecast loop
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let days = ["Mon", "Tues", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `   
         <div class = "col-2">
  <div class = "Mon-forecast"> ${day}  </div>
    <div>
 <img src = "https://openweathermap.org/img/wn/50d@2x.png" alt = "cloudy" class = "weather-cloudy-icon" width ="45px" /> </div>
   <span class = "Max-temp"> 85
   &deg; </span><span class = "Min-temp"> 65&deg;</span>
  </div> 
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
