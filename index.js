import { Header, Footer, Nav, Main } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import * as images from "./Images";

const router = new Navigo("/");
// let clothes;

function getImage(src, nextFunc) {
  console.log("Get Image");
  let img = new Image();
  img.addEventListener("load", () => {
    console.log("loaded");
    nextFunc(img);
  });
  img.addEventListener("error", err => {
    console.log("error", err);
  });
  img.src = src;
}

function loadAvatar(img = this) {
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

function loadClothes(img = this) {
  //This does not clear the screen.  This is for adding the layers of clothing to the avatar.
  let av = document.getElementById("avatar");
  let av_ctx = av.getContext("2d");
  av_ctx.imageSmoothingEnabled = false;
  av_ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    2,
    2,
    av.width - 4,
    av.height - 4
  );
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  if (state.view === "Weathercoat") {
    let avatar = document.getElementsByName("player");
    for (let radio of avatar) {
      radio.onclick = function() {
        console.log("Selected Avatar: ", this.id);
        getImage(images[this.id], loadAvatar);
      };
    }
    getImage(images["avatar1"], loadAvatar);
  }
}

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav()}
    ${Main(state)}
    ${Footer()}
  `;
  afterRender(state);
  router.updatePageLinks();
}

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    switch (view) {
      case "Home":
        done();
        break;
      case "About":
        done();
        break;
      case "Contact":
        done();
        break;
      case "Weathercoat":
        axios
          .get(`${process.env.WEATHER_SERVER}/weather`)
          .then(response => {
            // Storing retrieved data in state
            let data = response.data;
            store.Weathercoat.humidity = data.humidity + "%";
            store.Weathercoat.realFeel = data.feelTemp + "\xBAF";
            store.Weathercoat.realTemp = data.currentTemp + "\xBAF";
            store.Weathercoat.visibility = data.visibility + "%";
            let date = new Date();
            store.Weathercoat.weather_date = date.toDateString();
            store.Weathercoat.weather_time = date.toTimeString();
            store.Weathercoat.weather_location = `${data.city} (${data.lat}. ${data.lon})`;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      default:
        done();
    }
  }
});

router
  .on({
    "/": () => render(store.Home),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
