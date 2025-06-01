const savedData = localStorage.getItem('weatherData');
if (savedData) {
  const data = JSON.parse(savedData);
  const weatherBox = document.getElementById('weather');
  weatherBox.innerHTML = `
    <h2>Location: ${data.name}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Condition: ${data.weather[0].description}</p>
  `;
}

const apiKey = 'f8b03c5cbce0fabc957e847dce669a80';

navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    })
    .then(data => {
      const weatherBox = document.getElementById('weather');
      weatherBox.innerHTML = `
        <h2>Location: ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Condition: ${data.weather[0].description}</p>
      `;
      localStorage.setItem('weatherData', JSON.stringify(data));
    })
    .catch(error => {
      document.getElementById('weather').textContent = 'Error fetching weather data.';
      console.error(error);
    });
});
