document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('getWeatherButton');
    const citiesInput = document.getElementById('citiesInput');
    const weatherResults = document.getElementById('weatherResults');
  
    getWeatherButton.addEventListener('click', async () => {
        console.log("first")
      const cities = citiesInput.value.split(',').map(city => city.trim());
  
      const response = await fetch('http://localhost:3000/getWeather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cities }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const weatherData = data.weather;
        let resultHtml = '<h2>Weather Results</h2><ul>';
        for (const city in weatherData) {
          resultHtml += `<li>${city}: ${weatherData[city]}</li>`;
        }
        resultHtml += '</ul>';
        weatherResults.innerHTML = resultHtml;
      } else {
        weatherResults.innerHTML = '<p>Error fetching weather data.</p>';
      }
    });
  });
  