const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;
const API_KEY = "3b05a7c1e445b992f35b96c051e6a892";

// Use the cors middleware to enable CORS
app.use(cors());
app.use(express.json());

app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};

  try {
    for (const city of cities) {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}`);
      const temperature = response.data.main.temp;
      weatherData[city] = `${temperature}°C`;
    }
    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
