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

function setCustomCity(form) {
  console.log("clicked");
  // return { city: form.city, state: form.state, country: form.country };
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  if (state.view === "Weathercoat") {
    let avatar = document.getElementsByName("player");

    for (let radio of avatar) {
      radio.onclick = function() {
        store.Weathercoat.avatar = this.id;
        console.log("Selected Avatar: ", store.Weathercoat.avatar);
        getImage(images[store.Weathercoat.avatar], loadAvatar);
      };
    }

    document.getElementById("edit").addEventListener("click", () => {
      setCustomCity();
    });

    Array.from(avatar, radio => {
      if (radio.id == store.Weathercoat.avatar) {
        radio.checked = true;
      }
    });
    getImage(images[store.Weathercoat.avatar], loadAvatar);
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

function loadDateTime() {
  let date = new Date();
  store.Weathercoat.weather_date = date.toDateString();
  store.Weathercoat.weather_time = date.toTimeString();
}

function setWeatherData(data) {
  store.Weathercoat.humidity = `${data.humidity}%`;
  store.Weathercoat.realFeel = `${data.feelTemp}\xBAF`;
  store.Weathercoat.realTemp = `${data.currentTemp}\xBAF`;
  store.Weathercoat.visibility = `${data.visibility}%`;
  store.Weathercoat.weather_location = `${data.city} (${data.lat}. ${data.lon})`;
  loadDateTime();
}

// function clearWeatherData(){
//   store.Weathercoat.humidity = "";
//   store.Weathercoat.realFeel = "";
//   store.Weathercoat.realTemp = "";
//   store.Weathercoat.visibility = "";
//   store.Weathercoat.weather_location = "";
// }

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
        if (!store.Weathercoat.weather_location) {
          Promise.all([
            axios
              .get(`${process.env.WEATHER_SERVER}/weather`)
              .then(response => {
                // Storing retrieved data in state
                setWeatherData(response.data);
              })
              .catch(error => {
                console.log("It puked on weather", error);
              }),
            axios
              .get("https://api.goprogram.ai/inspiration")
              .then(response => {
                // Storing retrieved data in state
                console.log(response.headers);
                let data = response.data;
                store.Weathercoat.quote = `'${data.quote}'`;
                store.Weathercoat.author = `- ${data.author}`;
              })
              .catch(error => {
                console.log("It puked on inspiration", error);
              })
          ])
            .then(() => done())
            .catch(error => {
              console.log("Promise broken", error);
              done();
            });
        } else {
          done();
        }
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
