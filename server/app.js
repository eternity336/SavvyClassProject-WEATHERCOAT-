const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4040;

// CORS Middleware used to add headers (Not safe but needed for local testing)
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
  //Adds IP for weather look up
  res.setHeader("X-Forwarded-For", req.ip);
  next();
};

app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.use(express.json());
app.use(cors);

const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

// Handle the request with HTTP GET method from http://localhost:4040/weather
app.get("/weather", async (request, response) => {
  let IP = `${(request.header("x-forwarded-for") || request.ip).split(",")[0]}`;
  let data = request.query;
  // console.log("REQ: (weather)", data);
  if (data) {
    let city = data.city;
    let state = data.state;
    let country = data.country;
    if (city) {
      response.json(await getLatLonByCity(city, state, country));
      return;
    }
  }
  
  if (["::ffff:127.0.0.1", "::1", "127.0.0.1"].includes(IP)) {
    response.json(await getLatLon("174.69.63.85"));
    return;
  }
  response.json(await getLatLon(IP));
});

app.get("/customweather", async (request, response) => {
  // let IP = `${(request.header("x-forwarded-for") || request.ip).split(",")[0]}`;
  let data = request.query;
  // console.log("REQ: (custom)", data);
  let city = data.city;
  let state = data.state;
  let country = data.country;
  response.json(await getLatLonByCity(city, state, country));
});

async function getLatLonByCity(city, state, country) {
  //Function for getting the lat/lon needed for weather based on city information
  let weather_data = {};
  let _state = "";
  if (state) {
    _state = `&state=${state}`;
  }
  return await axios
    .get(
      `https://api.api-ninjas.com/v1/geocoding?city=${city}${_state}&country=${country}`,
      { headers: { "X-Api-Key": "nNF8CwcsuVqRD5/fwmdxIg==vAB2FHpFJpQHxXVm" } }
    )
    .then(response => {
      // Storing retrieved data in state
      let data = response.data[0];
      console.log(data);
      if (data){
        let lat = data.latitude;
        let lon = data.longitude;
        let city = data.name;
        if (data.country == 'US'){
          state = data.state;
        }
        return getWeather(lat, lon, city, state, country);
      }
      return {}
    })
    .catch(error => {
      console.log("It puked on custom [lat lon]", error);
      return {};
    });
}

async function getLatLon(IP) {
  //function used to get lat/lon needed for weather based on IP information
  let weather_data = {};
  return await axios
    .get(`https://ipapi.co/${IP}/json/`)
    .then(response => {
      // Storing retrieved data in state
      let data = response.data;
      let lat = data.latitude;
      let lon = data.longitude;
      let city = data.city;
      let state = ""
      let country = data.country_code;
      if (country == 'US'){
        state = data.region_code;
      }
      return getWeather(lat, lon, city, state, country);
    })
    .catch(error => {
      console.log("It puked [lat lon]", error);
      return {};
    });
}

function formatWeather(weather, lat, lon, city, state, country){
  //Sets up weather data for return
  let today = weather[0]
  let today_date = new Date().toISOString().split("T")[0];
  let restOfDays = weather.filter(data => data.dt_txt.split(" ")[1] == "12:00:00" ).map(item => { return { "date": item.dt_txt.split(" ")[0], "temp": kelvinToFahrenheit(item.main.temp), "icon": item.weather[0].icon}; } );
  return {
    currentTemp: kelvinToFahrenheit(today.main.temp),
    feelTemp: kelvinToFahrenheit(today.main.feels_like),
    humidity: today.main.humidity,
    visibility: today.visibility / (10000 / 100),
    today_icon: today.weather[0].icon,
    alert: today.weather.map(data => {return data.description}),
    restOfDays: restOfDays,
    lat: lat,
    lon: lon,
    city: city,
    state: state,
    country: country
  };
}

async function getWeather(lat, lon, city, state ,country) {
  let weather_data = {};
  return await axios
    .post(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
    )
    .then(response => {
      return formatWeather(response.data.list, lat, lon, city, state ,country);
    })
    .catch(error => {
      console.log("Get Weather: ", error);
      return {};
    });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
