const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value || "Kottayam";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const result = `
        <h2>${data.name}, Kerala</h2>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>☁ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
      `;
      document.getElementById("weatherResult").innerHTML = result;
    })
    .catch(err => {
      document.getElementById("weatherResult").innerHTML = "City not found!";
    });
});
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

// Detect user location automatically
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeatherByCoords, showError);
  } else {
    document.getElementById("weatherResult").innerHTML = "Geolocation not supported.";
  }
};

function showWeatherByCoords(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("weatherResult").innerHTML = `
        <h2>${data.name}, Kerala</h2>
        <p>🌡 Temp: ${data.main.temp} °C</p>
        <p>☁ Condition: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
      `;
    });

  // 5‑day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      let forecastHTML = "<h3>📅 5‑Day Forecast</h3><div class='forecast'>";
      // Forecast every 24h (API gives 3‑hour intervals → pick one per day)
      for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        const date = new Date(day.dt_txt).toDateString();
        forecastHTML += `
          <div class="day">
            <p><strong>${date}</strong></p>
            <p>🌡 ${day.main.temp} °C</p>
            <p>☁ ${day.weather[0].description}</p>
          </div>
        `;
      }
      forecastHTML += "</div>";
      document.getElementById("weatherResult").innerHTML += forecastHTML;
    });
}

function showError(error) {
  document.getElementById("weatherResult").innerHTML = "Unable to retrieve location.";
}
