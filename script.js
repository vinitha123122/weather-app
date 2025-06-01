const apiKey = 'f8b03c5cbce0fabc957e847dce669a80'; // Replace with your real key in quotes

navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`)
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
    })
    .catch(error => {
      document.getElementById('weather').textContent = 'Error fetching weather data.';
      console.error(error);
    });
});

 
fetch(`https://api.openweathermap.org/data/2.5/weather?...`)
  .then(response => response.json())
  .then(data => {
    if (data.cod !== 200) {
      document.getElementById('weather').innerHTML = `Error: ${data.message}`;
      return;
    }

    // Only runs if API key worked
    const weatherBox = document.getElementById('weather');
    weatherBox.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
  });
