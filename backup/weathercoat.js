import dotenv from "dotenv";

dotenv.config();

let avatar = document.getElementsByName("player");
let clothes;

fetch(`${process.env.WEATHER_SERVER}/data/weathercoat_clothes.json`)
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
4
function getWeather() {
  //Get the weather to define clothing
  fetch(`${process.env.WEATHER_SERVER}/weather`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("humidity").innerText = data.humidity + "%";
      document.getElementById("realFeel").innerText = data.feelTemp + "\xBAF";
      document.getElementById("realTemp").innerText =
        data.currentTemp + "\xBAF";
      document.getElementById("visibility").innerText = data.visibility + "%";
      let date = new Date();
      document.getElementById("weather_date").innerText = date.toDateString();
      document.getElementById("weather_time").innerText = date.toTimeString();
      document.getElementById(
        "weather_location"
      ).innerText = `${data.city} (${data.lat}. ${data.lon})`;
    });
}
