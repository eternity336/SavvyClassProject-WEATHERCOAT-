import dotenv from "dotenv";

let avatar = document.getElementsByName("player");
let clothes;
let IP = "";
let latitude = 0;
let longitude = 0;
let city = "";
let currentTemp = 0;
let feelTemp = 0;
let humidity = 0;
let visibility = 0;

const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

//This is the URL to pull from
fetch("https://api.ipify.org?format=json")
  //THis fetches the response
  .then(response => response.json())
  //This returns the users IP
  .then(data => (IP = data.ip));

fetch(`https://ipapi.co/${IP}/json/`)
  .then(response => response.json())
  .then(data => {
    console.log(data, data.city);
    latitude = data.latitude;
    longitude = data.longitude;
    city = data.city;
    getWeather();
  });

fetch("./data/weathercoat_clothes.json")
  .then(response => response.json())
  .then(json => (clothes = json));

function getImage(src, nextFunc) {
  let img = new Image();
  img.src = src;
  img.onload = nextFunc;
}

for (let radio of avatar) {
  radio.onclick = function() {
    getImage(`./Images/${this.id}.png`, loadAvatar);
    window.addEventListener("load", () => getWeather());
  };
}

function loadAvatar() {
  //This is just for loading the avatar.  It clears the canvas and adds the avatar
  let av = document.getElementById("avatar");
  let av_ctx = av.getContext("2d");
  av_ctx.imageSmoothingEnabled = false;
  av_ctx.beginPath();
  av_ctx.rect(0, 0, av.width, av.height);
  av_ctx.fillStyle = "lightblue";
  av_ctx.fill();
  av_ctx.drawImage(
    this,
    0,
    0,
    this.width,
    this.height,
    5,
    5,
    av.width - 10,
    av.height - 10
  );
}

function loadClothes() {
  //This does not clear the screen.  This is for adding the layers of clothing to the avatar.
  let av = document.getElementById("avatar");
  let av_ctx = av.getContext("2d");
  av_ctx.imageSmoothingEnabled = false;
  av_ctx.drawImage(
    this,
    0,
    0,
    this.width,
    this.height,
    2,
    2,
    av.width - 4,
    av.height - 4
  );
}

function getWeather() {
  //Get the weather to define clothing
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      currentTemp = kelvinToFahrenheit(data.main.feels_like);
      feelTemp = kelvinToFahrenheit(data.main.temp);
      humidity = data.main.humidity;
      visibility = data.visibility / (10000/100);
      document.getElementById("humidity").innerText = humidity + "%";
      document.getElementById("realFeel").innerText = feelTemp + "\xBAF";
      document.getElementById("realTemp").innerText = currentTemp + "\xBAF";
      document.getElementById("visibility").innerText = visibility + "%";
      let date = new Date();
      document.getElementById("weather_date").innerText = date.toDateString();
      document.getElementById("weather_time").innerText = date.toTimeString();
      document.getElementById("weather_location").innerText = `${city} (${latitude}. ${longitude})`;
    });
}
