const express = require("express");
const dotenv = require("dotenv");
const request = require("request");

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

// Handle the request with HTTP GET method from http://localhost:4040/weather
app.get("/weather", async (request, response) => {
  let IP = `${request.socket.remoteAddress}`;
  console.log("__" + IP + "__");

  if (IP == "::1") {
    console.log("LOOP");
    let data = getLatLon("174.69.63.85");
    response.json(data);
    return;
  }
  response.json(getLatLon());
});

function getLatLon(IP) {
  request.get(`https://ipapi.co/${IP}/json/`, async (err, res, body) => {
    console.log("getlatlon");
    if (!err && res.statusCode == 200) {
      let data = JSON.parse(body);
      let lat = data.latitude;
      let lon = data.longitude;
      let city = data.city;
      let weather_data = getWeather(lat, lon, city);
      return weather_data;
    }
  });
}

function getWeather(lat, lon, city) {
  request.post(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`,
    async (err, res, body) => {
      console.log("getweather");
      if (!err && res.statusCode == 200) {
        let data = JSON.parse(body);
        return {
          currentTemp: kelvinToFahrenheit(data.main.feels_like),
          feelTemp: kelvinToFahrenheit(data.main.temp),
          humidity: data.main.humidity,
          visibility: data.visibility / (10000 / 100),
          lat: lat,
          lon: lon,
          city: city
        };
      }
    }
  );
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
