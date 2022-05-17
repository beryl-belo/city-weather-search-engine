// static code for displaying city temperature
// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// // write your code here
// let city = prompt("Enter a city");
// city = city.toLowerCase();

// if (weather[city] !== undefined) {
//   let temperature = weather[city].temp;
//   let celsiusTemp = Math.round(temperature);
//   let fahrenheitTemp = Math.round((temperature * 9) / 5 + 32);
//   let humidity = weather[city].humidity;

//   alert(
//     `It is currently ${celsiusTemp}°C (${fahrenheitTemp}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

// // display current date/time
// let dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// let monthList = [
//   "null",
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// // display current date/time/day
// let currentDT = new Date();
// let currentDate = currentDT.getDate();
// if (currentDate < 10) {
//   currentDate = `0${currentDate}`;
// }
// let currentMonth = currentDT.getMonth();
// let currentYear = currentDT.getFullYear();
// let currentDay = currentDT.getDay();
// let currentHour = currentDT.getHours();
// if (currentHour < 10) {
//   currentHour = `0${currentHour}`;
// }
// let currentMin = currentDT.getMinutes();
// if (currentMin < 10) {
//   currentMin = `0${currentMin}`;
// }
// let currentDateTime = document.querySelector("#currentDateTime");
// currentDateTime.innerHTML = `${currentDate} ${monthList[currentMonth]} ${currentYear} ${dayList[currentDay]} ${currentHour}:${currentMin}`;

// update city name
// function cityResult(event) {
//   event.preventDefault();
//   let currentCity = document.querySelector("#current-city");
//   let searchCity = document.querySelector("input").value;
//   currentCity.innerHTML = ` ${searchCity}`;
// }

// display weather details of default city when load
onLoadSearch("Bangkok");

function onLoadSearch(event) {
  document.querySelector("input").value = event;
  let searchCity = event;
  let unit = "metric";
  let apiKey = "481cea56c4f2263ad817a4c796f0dc58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${unit}&appid=${apiKey}`;

  // axios.get(apiUrl).then(showCity);
  axios.get(apiUrl).then(showCityTempC);
}
// update city name and respective temperature
function getSearchCityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("input").value;
  let unit = "metric";
  let apiKey = "481cea56c4f2263ad817a4c796f0dc58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${unit}&appid=${apiKey}`;

  // axios.get(apiUrl).then(showCity);
  axios.get(apiUrl).then(showCityTempC);
}

function formatDate(dateTime) {
  let raw = new Date(dateTime);

  let date = raw.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = raw.getMonth();
  let year = raw.getFullYear();
  let hour = raw.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = raw.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let weekday = raw.getDay();
  let dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let monthList = [
    "null",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date} ${monthList[month]} ${year} (${dayList[weekday]}) ${hour}:${minute}`;
}

function showCityImage(image) {
  let randomInt = Math.floor(Math.random() * 5 + 1);
  let imageRaw = image.data.hits[randomInt].largeImageURL;
  document.getElementById("cityImage").src = imageRaw;
}

function showCityTempC(response) {
  cityLat = response.data.coord.lat;
  cityLon = response.data.coord.lon;
  let currentCity = document.querySelector("#current-city");
  let responseCityName = response.data.name;
  currentCity.innerHTML = responseCityName;
  document.querySelector("input").value = responseCityName;
  document.getElementById("cityImage").alt = responseCityName;
  // show city image
  let apiPhotoKey = "27435421-2a1832c30c90f292779ee6779";
  let apiPhotoCity = responseCityName;
  let apiPhotoUrl = `https://pixabay.com/api/?key=${apiPhotoKey}&q=${apiPhotoCity}&image_type=photo&category=places+travel+food&per_page=5&order=popular&pretty=true&orientation=horizontal`;
  axios.get(apiPhotoUrl).then(showCityImage);

  let currentTemp = document.querySelector("#currentTempValue");
  celsiusTempRaw = Math.round(response.data.main.temp);
  currentTemp.innerHTML = celsiusTempRaw;
  // to disable #fahrenheitUnit conversion css
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");

  let currentHumidity = document.querySelector("#humidity");
  let responseHumidity = response.data.main.humidity;
  currentHumidity.innerHTML = responseHumidity;

  let currentWind = document.querySelector("#wind");
  let responseWind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = responseWind;

  let currentDescription = document.querySelector("#description");
  let responseDescription = response.data.weather[0].description;
  currentDescription.innerHTML = responseDescription;

  let currentIcon = document.querySelector("#current-city-weather-icon");
  let responseIcon = response.data.weather[0].icon;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responseIcon}@2x.png`
  );
  currentIcon.setAttribute("alt", responseDescription);

  // // show current city datetime
  let currentDateTime = document.querySelector("#currentDateTime");
  currentDateTime.innerHTML = formatDate(response.data.dt * 1000);

  // to call function for displaying weather forecast
  let forecastApiKey = `481cea56c4f2263ad817a4c796f0dc58`;
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${cityLat}&lon=${cityLon}&exclude=current+minutely+hourly+alert&appid=${forecastApiKey}`;

  axios.get(forecastApiUrl).then(displayForecast);
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", getSearchCityName);

// get current location
function showCurrentPosition(currentPosition) {
  let lat = currentPosition.coords.latitude;
  let lon = currentPosition.coords.longitude;

  let apiKey = "481cea56c4f2263ad817a4c796f0dc58";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${lat}&lon=${lon}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityTempC);
}

function checkCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentLocation = document.querySelector(
  ".btn.btn-secondary.current-location"
);
currentLocation.addEventListener("click", checkCurrentLocation);

// temperature conversion (0°C × 9/5) + 32 = 32°F

function fahrenheitConversion(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#currentTempValue");
  // to disable #celsiusUnit conversion link
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  // currentTemp.innerHTML = 33; // reset value to celsius

  currentTemp.innerHTML = Math.round((celsiusTempRaw * 9) / 5 + 32);
  document.getElementById("fahrenheitUnit").innerHTML = "°F";
}

let fahrenheitTemp = document.querySelector("#fahrenheitUnit");
fahrenheitTemp.addEventListener("click", fahrenheitConversion);

// function celsiusConversion(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#currentTempValue");
//   currentTemp.innerHTML = 33; // reset value to celsius
// }
let celsiusTemp = document.querySelector("#celsiusUnit");
let celsiusTempRaw = null;
celsiusTemp.addEventListener("click", getSearchCityName);

// to execute weather forecast
let cityLat;
let cityLon;

function displayForecast(coordinates) {
  console.log(coordinates.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let dayList = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;

  dayList.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
    <div class="weather-forecast-date">${day}</div>
    <img src="http://openweathermap.org/img/wn/10n@2x.png" alt="" width="60" />
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-min">10°</span>
      <span class="weather-forecast-temperature-max">23°</span>
    </div>
  </div>`;
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}
