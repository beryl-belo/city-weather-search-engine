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

// display current date/time
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
// display current date/time/day
let currentDT = new Date();
let currentDate = currentDT.getDate();
if (currentDate < 10) {
  currentDate = `0${currentDate}`;
}
let currentMonth = currentDT.getMonth();
let currentYear = currentDT.getFullYear();
let currentDay = currentDT.getDay();
let currentHour = currentDT.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMin = currentDT.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
let currentDateTime = document.querySelector("#currentDateTime");
currentDateTime.innerHTML = `${currentDate} ${monthList[currentMonth]} ${currentYear} ${dayList[currentDay]} ${currentHour}:${currentMin}`;

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

function getIcon(code) {
  let iconCode = code;
  let apiUrl = `http://openweathermap.org/img/wn/${code}@2x.png`;
  return apiUrl;
}

function showCityTempC(response) {
  let currentCity = document.querySelector("#current-city");
  let responseCityName = response.data.name;

  currentCity.innerHTML = responseCityName;

  let currentTemp = document.querySelector("#currentTempValue");
  let responseTemp = response.data.main.temp;
  responseTemp = Math.round(responseTemp);
  currentTemp.innerHTML = responseTemp;

  let currentHumidity = document.querySelector("#humidity");
  let responseHumidity = response.data.main.humidity;
  currentHumidity.innerHTML = responseHumidity;

  let currentWind = document.querySelector("#wind");
  let responseWind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = responseWind;

  let currentDescription = document.querySelector("#description");
  let responseDescription = response.data.weather[0].description;
  currentDescription.innerHTML = responseDescription;

  let currentIcon = document.getElementById("current-city-weather-icon");
  let responseIcon = response.data.weather[0].icon;
  currentIcon.src = getIcon(responseIcon);

  // // show current city datetime
  let currentDateTime = document.querySelector("#currentDateTime");
  console.log(response);
  currentDateTime.innerHTML = formatDate(response.data.dt * 1000);
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

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", checkCurrentLocation);

// temperature conversion (0°C × 9/5) + 32 = 32°F

// function fahrenheitConversion(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#currentTempValue");
//   currentTemp.innerHTML = 33; // reset value to celsius
//   let temp = currentTemp;
//   currentTemp.innerHTML = Math.round((temp.textContent * 9) / 5 + 32);
// }
// let fahrenheitTemp = document.querySelector("#fahrenheitUnit");
// fahrenheitTemp.addEventListener("click", fahrenheitConversion);

// function celsiusConversion(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#currentTempValue");
//   currentTemp.innerHTML = 33; // reset value to celsius
// }
let celsiusTemp = document.querySelector("#celsiusUnit");
celsiusTemp.addEventListener("click", getSearchCityName);

// show city image
let apiKey = "AIzaSyCtgeyv1lr7ZlMC6rT2RXnVaMoKN22XoDU";
let apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=bangkok, IL&key=${apiKey}&inputtype=textquery&fields=name,photos`;
