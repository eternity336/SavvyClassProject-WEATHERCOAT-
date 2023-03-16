const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const users = require("./routers/users");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4040;
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

//CORS Middleware used to add headers (Not safe but needed for local testing)
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
app.use("/users", users);

const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

// Handle the request with HTTP GET method from http://localhost:4040/weather
app.get("/weather", async (request, response) => {
  let IP = `${(request.header("x-forwarded-for") || request.ip).split(",")[0]}`;
  let data = request.query;
  if (data) {
    let city = data.city;
    let state = data.state;
    let country = data.country;
    let lat = data.lat;
    let lon = data.lon;
    if (lat && lon) {
      console.log("LAT&LON");
      response.json(await getWeather(lat, lon, city, state, country));
      return;
    }

    if (city) {
      console.log("CITY");
      response.json(await getLatLonByCity(city, state, country));
      return;
    }
  }

  if (["::ffff:127.0.0.1", "::1", "127.0.0.1"].includes(IP)) {
    console.log("LOCAL");
    response.json(await getLatLon("174.69.63.85"));
    return;
  }
  response.json(await getLatLon(IP));
});

async function getLatLonByCity(city, state, country) {
  //Function for getting the lat/lon needed for weather based on city information
  return await axios({
    url: `http://api.positionstack.com/v1/forward?query=${[
      city,
      state,
      country
    ]}&access_key=${process.env.POSITIONSTACK_API}`,
    method: "GET"
  })
    .then(async response => {
      // Storing retrieved data in state
      let data = response.data.data[0];
      if (data) {
        let lat = data.latitude;
        let lon = data.longitude;
        let city = data.name;
        state = data.region;
        country = data.country_code;
        return getWeather(lat, lon, city, state, country);
      }
      return { error: "Not a location!" };
    })
    .catch(error => {
      console.log("It puked on custom [lat lon]", error);
      return { error: "Sorry wasn't able to find your location.  Try again." };
    });
}

async function getCityStateCountry(lat, lon) {
  return await axios({
    url: `http://api.positionstack.com/v1/reverse?query=${[
      lat,
      lon
    ]}&access_key=${process.env.POSITIONSTACK_API}`,
    method: "GET"
  })
    .then(async response => {
      // Storing retrieved data in state
      let data = response.data.data[0];
      console.log(response.data.data);
      if (data) {
        return [data.locality, data.region, data.country_code];
      }
      return ["", "", ""];
    })
    .catch(error => {
      console.log("It puked on custom [lat lon]", error);
      return { error: "Sorry wasn't able to find your location.  Try again." };
    });
}

async function getLatLon(IP) {
  //function used to get lat/lon needed for weather based on IP information
  return await axios
    .get(`https://ipapi.co/${IP}/json/`)
    .then(async response => {
      // Storing retrieved data in state
      let data = response.data;
      let lat = data.latitude;
      let lon = data.longitude;
      let city = data.city;
      let state = "";
      let country = data.country_code;
      state = data.region_code;
      return getWeather(lat, lon, city, state, country);
    })
    .catch(error => {
      console.log("It puked [lat lon]", error);
      return { error: "Need a location!" };
    });
}

function formatWeather(weather, lat, lon, city, state, country) {
  //Sets up weather data for return
  let today = weather[0];
  console.log([city, state, country]);
  let restOfDays = weather
    .filter(data => data.dt_txt.split(" ")[1] == "12:00:00")
    .map(item => {
      return {
        date: item.dt_txt.split(" ")[0],
        temp: kelvinToFahrenheit(item.main.temp),
        icon: item.weather[0].icon
      };
    });
  return {
    currentTemp: kelvinToFahrenheit(today.main.temp),
    feelTemp: kelvinToFahrenheit(today.main.feels_like),
    humidity: today.main.humidity,
    visibility: today.visibility / (10000 / 100),
    today_icon: today.weather[0].icon,
    wind_speed: today.wind.speed,
    wind_gust: today.wind.gust,
    wind_direction: today.wind.deg,
    alert: today.weather
      .map(data => {
        return data.description;
      })
      .join(", "),
    restOfDays: restOfDays,
    lat: lat,
    lon: lon,
    city: city,
    state: state,
    country: country
  };
}

async function getWeather(lat, lon, city, state, country) {
  return await axios
    .post(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`
    )
    .then(async response => {
      if (!city) {
        [city, state, country] = await getCityStateCountry(lat, lon);
      }
      return formatWeather(response.data.list, lat, lon, city, state, country);
    })
    .catch(error => {
      console.log("Get Weather: ", error);
      return { error: "Sorry wasn't able to find weather for your location." };
    });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
