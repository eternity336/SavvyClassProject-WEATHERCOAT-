import { Header, Footer, Nav, Main } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import * as images from "./Images";
import countries from "./data/countries.json";

const router = new Navigo("/");
const weatherTestData = {
  currentTemp: 63,
  feelTemp: 63,
  humidity: 82,
  visibility: 100,
  today_icon: "03n",
  restOfDays: [
    {
      date: "2023-03-11",
      temp: 58,
      icon: "02n"
    },
    {
      date: "2023-03-12",
      temp: 69,
      icon: "10n"
    },
    {
      date: "2023-03-13",
      temp: 53,
      icon: "04n"
    },
    {
      date: "2023-03-14",
      temp: 46,
      icon: "04n"
    },
    {
      date: "2023-03-15",
      temp: 49,
      icon: "04d"
    }
  ],
  lat: 30.4199,
  lon: -87.217,
  city: "Pensacola"
};

function getImage(src, nextFunc) {
  //universal function for adding images to the canvas.
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
  //This will not clear the canvas.  This is for adding the layers of clothing to the avatar.
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

function setCustomCity() {
  //Loads form to allow user to change the default location lookup.
  console.log("clicked");
  let form = document.createElement("form");
  form.id = "custom_location";
  let header = document.createElement("header");
  let city = document.createElement("input");
  city.id = "city";
  city.name = "city";
  city.placeholder = "city";
  city.required = true;
  let state = document.createElement("input");
  state.id = "state";
  state.name = "state";
  state.placeholder = "State (Optional) for US Only";
  let country = document.createElement("select");
  country.id = "country";
  country.name = "country";
  country.required = true;
  let cancel = document.createElement("button");
  cancel.id = "form_cancel";
  cancel.innerText = "Cancel";
  let submit = document.createElement("button");
  submit.id = "form_submit";
  submit.innerText = "Submit";
  form.method = "POST";
  form.action = "";
  form.style = "position: absolute; width: 300px; height: 400px;";
  form.append(header);
  form.append(city);
  form.append(state);
  form.append(country);
  form.append(cancel);
  form.append(submit);
  Object.keys(countries).forEach(element => {
    let option = document.createElement("option");
    option.name = element;
    option.id = element;
    option.value = element;
    option.text = `${element} [${countries[element]}]`;
    country.append(option);
  });
  document.body.append(form);
  cancel.addEventListener("click", event => {
    event.preventDefault();
    form.remove();
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    store.Weathercoat.weather_city = city.value;
    store.Weathercoat.weather_state = state.value;
    store.Weathercoat.weather_country = country.value;
    form.remove();
    router.navigate("/weathercoat");
  });
}

function afterRender(state) {
  //function for what to do after the page is rendered
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
  //Function for rendering the page
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
  //Function for grabbing date and time.
  let date = new Date();
  store.Weathercoat.weather_date = date.toDateString();
  store.Weathercoat.weather_time = date.toTimeString();
}

function setWeatherData(data) {
  //Function for setting weather data to the state
  store.Weathercoat.humidity = `${data.humidity}%`;
  store.Weathercoat.realFeel = `${data.feelTemp}\xBAF`;
  store.Weathercoat.realTemp = `${data.currentTemp}\xBAF`;
  store.Weathercoat.visibility = `${data.visibility}%`;
  store.Weathercoat.alert = data.alert;
  store.Weathercoat.restOfDays = data.restOfDays;
  store.Weathercoat.weather_location = `${data.city}, ${data.state} (${data.lat}. ${data.lon}) ${data.country}`;
  store.Weathercoat.weather_city = data.city;
  store.Weathercoat.weather_state = data.state;
  store.Weathercoat.weather_country = data.country;
  store.Weathercoat.today_icon = data.today_icon;
  loadDateTime();
}

router.hooks({
  //Before hook used to set data before render
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    const weathercoat_links = [];
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
        console.log("Weathercoat");
        weathercoat_links.push(
          axios.get(`${process.env.WEATHER_SERVER}/weather`, {
            params: {
              city: store.Weathercoat.weather_city,
              state: store.Weathercoat.weather_state,
              country: store.Weathercoat.weather_country
            }
          })
        );

        if (!store.Weathercoat.quote) {
          weathercoat_links.push(
            axios.get("https://api.goprogram.ai/inspiration")
          );
        }
        Promise.allSettled(weathercoat_links)
          .then(responses => {
            console.log("responses", responses);
            let weatherResponse = responses[0].value;
            setWeatherData(weatherResponse.data);
            if (responses.length > 1) {
              let inspirationResponse = responses[1].value;
              store.Weathercoat.quote = `'${inspirationResponse.data.quote}'`;
              store.Weathercoat.author = `- ${inspirationResponse.data.author}`;
            }
            done();
          })
          .catch(error => {
            console.log("Promise broken", error);
            done();
          });

        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
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
