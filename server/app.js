const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const { ClientRequest } = require("http");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4040;

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("X-Forwarded-For", req.ip);
  next();
};

app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.use(express.json());
app.use(cors);

const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

// TRY AXIOS!!!!
// Handle the request with HTTP GET method from http://localhost:4040/weather
app.get("/weather", async (request, response) => {
  let IP = `${request.header("x-forwarded-for") || request.ip}`;
  console.log(
    "My IP: ",
    request.ips,
    request.ip,
    request.socket.remoteAddress,
    request.header("x-forwarded-for")
  );
  // if (["::ffff:127.0.0.1", "::1", "127.0.0.1"].includes(IP)) {
  //   response.json(await getLatLon("174.69.63.85"));
  //   return;
  // }
  // response.json(await getLatLon(IP));
});

async function getLatLon(IP) {
  let weather_data = {};
  return await axios
    .get(`https://ipapi.co/${IP}/json/`)
    .then(response => {
      // Storing retrieved data in state
      let data = response.data;
      let lat = data.latitude;
      let lon = data.longitude;
      let city = data.city;
      weather_data = getWeather(lat, lon, city);
      return weather_data;
    })
    .catch(error => {
      console.log("It puked [lat lon]", error);
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
      return weather_data;
    });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
