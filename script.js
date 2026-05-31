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
