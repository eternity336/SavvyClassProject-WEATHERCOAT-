const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

// TRY AXIOS!!!!
// Handle the request with HTTP GET method from http://localhost:4040/weather
app.get("/weather", async (request, response) => {
  let IP = `${request.socket.remoteAddress}`;
  console.log("__" + IP + "__");

  if (IP == "::ffff:127.0.0.1") {
    console.log("LOOP");
    response.json(await getLatLon("174.69.63.85"));
    return;
  }
  response.json(await getLatLon());
});

async function getLatLon(IP) {
  let weather_data = {};
  return await axios
    .get(`https://ipapi.co/${IP}/json/`)
    .then(response => {
      // Storing retrieved data in state
      console.log(response.data);
      let data = response.data;
      let lat = data.latitude;
      let lon = data.longitude;
      let city = data.city;
      weather_data = getWeather(lat, lon, city);
      console.log("get_lat_lon:", weather_data);
      return weather_data;
    })
    .catch(error => {
      console.log("It puked", error);
    });
}

async function getWeather(lat, lon, city) {
  let weather_data = {};
  return await axios
    .post(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
    )
    .then(response => {
      let data = response.data;
      weather_data = {
        currentTemp: kelvinToFahrenheit(data.main.feels_like),
        feelTemp: kelvinToFahrenheit(data.main.temp),
        humidity: data.main.humidity,
        visibility: data.visibility / (10000 / 100),
        lat: lat,
        lon: lon,
        city: city
      };
      console.log("get_weather:", weather_data);
      return weather_data;
    });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
