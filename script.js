let isCelsius = true;
let currentWeather = null;


async function getWeather(location) {
  const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=AYJJQGEYJTE5CTLTTCHCWEGMB`
);
const data = await response.json();

currentWeather = processWeather(data);
displayWeather(currentWeather);

}
function processWeather(data) {

  return {
    city: data.resolvedAddress,
    temperature: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity
  };

}

const form = document.getElementById("weatherForm");
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const location = document.getElementById("location").value;
  getWeather(location);
})

function displayWeather(weather) {

  const result = document.getElementById("weatherResult");

  result.style.display = "block";

  let temp = weather.temperature;
  if (!isCelsius) {
    temp = (temp * 9/5) + 32;
  }

  result.innerHTML = `
    <h2>${weather.city}</h2>
    <p>Temperature:  ${temp.toFixed(1)}°${isCelsius ? "C" : "F"}</p>
    <p>Conditions: ${weather.conditions}</p>
    <p>Humidity: ${weather.humidity}%</p>
  `;

}

const toggleButton = document.getElementById("unitToggle");

toggleButton.addEventListener("click", () => {

  isCelsius = !isCelsius;

  toggleButton.textContent = isCelsius
    ? "Switch to °F"
    : "Switch to °C";

  if (currentWeather) {
    displayWeather(currentWeather);
  }

});