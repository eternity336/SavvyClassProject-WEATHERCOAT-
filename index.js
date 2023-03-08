import { Header, Footer, Nav, Main } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import dotenv from "dotenv";

dotenv.config();
const router = new Navigo("/");
let avatar = document.getElementsByName("player");
let clothes;

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav()}
    ${Main(state)}
    ${Footer()}
  `;
  router.updatePageLinks();
}

router
  .on({
    "/": () => render(store.Home),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
      if (view == "Weathercoat") {
        getWeather();
        // loadAvatar();
      }
    }
  })
  .resolve();

// fetch("./data/weathercoat_clothes.json")
//   .then(response => response.json())
//   .then(json => (clothes = json));

function getImage(src, nextFunc) {
  console.log("Get Image");
  let img = new Image();
  img.onload = nextFunc;
  img.src = src;
}

for (let radio of avatar) {
  radio.onclick = function() {
    console.log("Selected Avatar: ", this.id);
    getImage(`./Images/${this.id}.png`, loadAvatar);
  };
}

function loadAvatar(img) {
  //This is just for loading the avatar.  It clears the canvas and adds the avatar
  console.log("Load Avatar", img, img.width, img.height);
  let av = document.getElementById("avatar");
  let av_ctx = av.getContext("2d");
  av_ctx.imageSmoothingEnabled = false;
  av_ctx.beginPath();
  av_ctx.rect(0, 0, av.width, av.height);
  av_ctx.fillStyle = "lightblue";
  av_ctx.fill();
  av_ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
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
  fetch(`${process.env.WEATHER_SERVER}/weather`)
    .then(response => response.json())
    .then(data => {
      console.log("FETCH:", data);
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
