// ************,,,,,,,,,,,,,,,,,(/*((%***(,*/**/*,,,,,,,,,,,*******************////
// ***********,,,,,,,,,,,,,,/**#&%&&@&&&&#%%&&&&&&,,,,,,,,,,,,,******************//
// **********,,,,,,,,,**/%#&&&&&@@&&&&&&&@&&@&&&&@@@&&*,,,,,,,,,,*****************/
// ********,,,,,,,,*/(#(&&@@@@@@@%##((((((((#%&&&&&&&&&#*,,,,,,,,,,****************
// ******,,,,,,,,***/#&&@@&@@@##((((/(//(/((((((#(%@@@@&&*,,,,,,,,,,***************
// ****,,,,,,,,,*(*#%&&@&@&&#((((/(/////////////((((#@@&&/*,,,,,,,,,***************
// ,,,,,,,,,,,,*,(%&&@@@&&##((/////////////////////((#&@&&#*,,,,,,,,,,,************
// ,,,,,,,,,,,,**&@@&@@&&%((((///////////*///////////((@@&&%*,,,,,,,,,,************
// ,,,,,,,,,,,,,%@(&&&&&%#(////////(////**////////////((@@@&&,*,,,,,,,,************
// ,,,,,,,,,,,,#&#&&&&&&%(((/#((///##(((/******/////////#&@@&&,,,,,,,,,,,**********
// ,,,,,,,,,,,*@&%&&@@@@@%&&##%&%/////((///////((##%%%(((&&&@@%*,,,,,,,,,,*********
// ,,,,,,,,,,,%&@@&&@@&#(#&@%####(%%#####@&*%(#%&&&&&&&(%@@&&&&%*,,,,,,,,,,********
// ,,,,,,,,.//%&@@@%@#%((((%#((##(((((//(#%//@###%#%#####&&@#&&&**,,,,,,,,,********
// ,,*,**,,##(#&&@@@@&&(((/((///////////#(////#/////(((((%&&&@&&%#*,,,,,,,,********
// ,*,*,,/(/%(&&&@@@@@&#(((//(((*((###,#((////(///////(/(%%&&&&&&#*,,,,,,,,********
// /,,,,(/((%%#%&@@@@%&#(((//////////((((///*//(**/((#((((&&&&&&##/,,,,,,,,********
// ,,,,*(//&%%&@&@@@@%%%#((((//////////#(#%#((#(/***/////%@@&@&&%*,,,,,,,,,,*******
// ,,,/*(#/%%%&@@@@@&&&%%#(((/////////####%(%%#(//**/////%@&@&&((/(,,,,,,,,,*,*****
// ,*,/*/%(%#&&@@@@@@@&&%##((((///#####(((////##(((/////#%&%%%%(,,,,,,,,,,,,,******
// ,,,(/(/#&@&@@@&@&&&&%%%####(//(#(((#((((((((#(/((((/(%&%&&#&#*/,,,,,,,,,,,******
// *,*#*%%#&#&&&&@@@&@&@&&%%#%#(((((//(##(#((////////(#%%&&&&#*&%(*,,,,,,,,,,,*****
// ,*#&%&%#&%%&&&@@@@@@&&&&&%%%%#%#(((((#%%%((//////##&&&&@&@@@&%%/*(*,#/*,,,,,,***
// ,(%/#%%&%&@@&@@@@&@@@@@@&&%%%%%%%#%#####%#((((####&&&@&&%%@%&#&%,(,##/*,,,,,,,,*
// ,,//##&&&@&@@@@@@@@@@@&@@&@&&&&&&%%%%%%#####%%%%%&&&&&&&&&@&#%#%***#,,,,,,,,,,,,
// #(##&&%@@@@@&@@@@@@@@@@@@@@@@@&&@&%&&&&&&%%%%%%&&&&@@@@@&&@&&&&&&%**,,,,,,,,,,,,
// %(@@@&&@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&@&&&&%&%%&@@&@@&@%@&&&&&&%&(&&&&(,,,,,,,,
// @@@%&&@@@@@@@@@@@@&@@@@@@&@@@@@@@@@&@&&&&@&&#&#%%%@@@&@&(&&@&&&&&&&&%@@@&,,,,,,,
// @@&&@@@@%@@@@@@@&@@@@@@@@@@@@@@@@@%#(#((#%(//(#%%(/#(&@@&@@&&&&@&@@&@@&@###,,,,,
// @@&@@@%@&@&@&@@@@@@#%@&@@@@&@@%@@@@@@(((((((&%###&&@@#@&@@&@&@#@&%@,&&%#&@@(&,,,
// @@@%@%@@@@#@@@@@#%@@#@@@&@@%@@@@@%&@@@%(@@&&%@@&@&&@%@@#@@##@%@&#%&(@#&#&@%@##%,
// @%&@@@#%@@@@@@#@&@@@@@@@@@#@&#@@&@@#@/@&@@&@@@@/(%@@%&%&#&%@&@@@%(@@@@(@@%@(##@&
// @@@@@@&@%@###@%%@@@@&@@@@@@@@@&@%#@/@%%@&@%&&%&@@@@(%(@@@@@&@@@%@/@(@%@*@%@@*%%&

import { Header, Footer, Nav, Main } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import countries from "./data/countries.json";
import adjectives from "./data/adjectives.json";
import animals from "./data/animals.json";

console.log(
  adjectives[Math.floor(Math.random() * 100)] +
    animals[Math.floor(Math.random() * 103)]
);

const router = new Navigo("/");

function chooseClothes(data) {
  if (data.alert.includes("rain")) {
    return "raincoat";
  }
  if (data.alert.includes("snow")) {
    return "winter";
  }
  if (data.feelTemp <= 25) {
    return "winter";
  } else if (data.feelTemp < 45) {
    return "jacket";
  } else if (data.feelTemp < 60) {
    return "cool";
  } else if (data.feelTemp < 65) {
    return "mid";
  } else if (data.feelTemp < 75) {
    return "warm";
  } else {
    return "hot";
  }
}

function setCustomCity() {
  //Loads form to allow user to change the default location lookup.
  let form = document.createElement("form");
  form.id = "custom_location";
  let header = document.createElement("header");
  let city = document.createElement("input");
  city.id = "city";
  city.name = "city";
  city.placeholder = "City";
  city.pattern = "[ a-zA-Z]+";
  city.required = true;
  let state = document.createElement("input");
  state.id = "state";
  state.name = "state";
  state.pattern = "[ a-zA-Z]+";
  state.placeholder = "State or Region (Optional)";
  let country = document.createElement("select");
  country.id = "country";
  country.name = "country";
  country.required = true;
  let button_div = document.createElement("div");
  button_div.class = "form_button_div";
  let lat_lon = document.createElement("button");
  lat_lon.id = "form_latlon";
  lat_lon.innerText = "Lat/Lon";
  let cancel = document.createElement("button");
  cancel.id = "form_cancel";
  cancel.innerText = "Cancel";
  let submit = document.createElement("button");
  submit.id = "form_submit";
  submit.innerText = "Submit";
  form.method = "POST";
  form.action = "";
  form.append(header);
  form.append(city);
  form.append(state);
  form.append(country);
  button_div.append(submit);
  button_div.append(cancel);
  button_div.append(lat_lon);
  form.append(button_div);
  Object.keys(countries).forEach(element => {
    let option = document.createElement("option");
    option.name = element;
    option.id = element;
    option.value = element;
    option.text = `${element} [${countries[element]}]`;
    country.append(option);
  });
  document.body.append(form);
  lat_lon.addEventListener("click", event => {
    event.preventDefault();
    form.remove();
    setLatLon();
  });
  cancel.addEventListener("click", event => {
    event.preventDefault();
    form.remove();
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    store.Weathercoat.weather_city = city.value;
    store.Weathercoat.weather_state = state.value;
    store.Weathercoat.weather_country = country.value;
    store.Weathercoat.lat = "";
    store.Weathercoat.lon = "";
    form.remove();
    router.navigate("/weathercoat");
  });
}

function setLatLon() {
  //Loads form to allow user to change the default lat and lon.
  let form = document.createElement("form");
  form.id = "custom_location";
  let header = document.createElement("header");
  let lat = document.createElement("input");
  lat.id = "lat";
  lat.name = "lat";
  lat.placeholder = "lat";
  lat.required = true;
  let lon = document.createElement("input");
  lon.id = "lon";
  lon.name = "lon";
  lon.placeholder = "lon";
  lat.required = true;
  let button_div = document.createElement("div");
  button_div.class = "form_button_div";
  let city_form = document.createElement("button");
  city_form.id = "city_form";
  city_form.innerText = "City Form";
  let cancel = document.createElement("button");
  cancel.id = "form_cancel";
  cancel.innerText = "Cancel";
  let submit = document.createElement("button");
  submit.id = "form_submit";
  submit.innerText = "Submit";
  form.method = "POST";
  form.action = "";
  form.append(header);
  form.append(lat);
  form.append(lon);
  button_div.append(submit);
  button_div.append(cancel);
  button_div.append(city_form);
  form.append(button_div);
  document.body.append(form);
  city_form.addEventListener("click", event => {
    event.preventDefault();
    form.remove();
    setCustomCity();
  });
  cancel.addEventListener("click", event => {
    event.preventDefault();
    form.remove();
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    store.Weathercoat.weather_city = "";
    store.Weathercoat.weather_state = "";
    store.Weathercoat.weather_country = "";
    store.Weathercoat.lat = lat.value;
    store.Weathercoat.lon = lon.value;
    form.remove();
    router.navigate("/weathercoat");
    if (store.Weathercoat.username) {
      axios
        .put(
          `${process.env.WEATHER_SERVER}/users/${store.Weathercoat.username}`,
          {
            data: {
              lat: store.Weathercoat.lat,
              lon: store.Weathercoat.lon,
              ip: "",
              avatar: store.Weathercoat.avatar
            }
          }
        )
        .then(response => {
          let data = response.data;
          console.log("putuser[radio]:", data);
          store.Weathercoat.username = data.name;
          store.Weathercoat.weather_country = "";
          store.Weathercoat.weather_state = "";
          store.Weathercoat.city = "";
          store.Weathercoat.lat = data.lat;
          store.Weathercoat.lon = data.lon;
          store.Weathercoat.avatar = data.avatar;
          router.navigate("/weathercoat");
        });
    } else {
      router.navigate("/weathercoat");
    }
  });
}

function loadUserForm() {
  let form = document.createElement("form");
  form.id = "loginuser";
  let header = document.createElement("header");
  header.innerText = "Select Username";
  let adj_select = document.createElement("select");
  adj_select.id = "adj_select";
  adj_select.name = "adj_select";
  Object.keys(adjectives).forEach(element => {
    let option = document.createElement("option");
    option.name = element;
    option.id = element;
    option.value = `${adjectives[element]}`;
    option.text = `${adjectives[element]}`;
    adj_select.append(option);
  });
  let animal_select = document.createElement("select");
  adj_select.id = "animal_select";
  adj_select.name = "animal_select";
  Object.keys(animals).forEach(element => {
    let option = document.createElement("option");
    option.name = element;
    option.id = element;
    option.value = `${animals[element]}`;
    option.text = `${animals[element]}`;
    animal_select.append(option);
  });
  let button_div = document.createElement("div");
  button_div.class = "form_button_div";
  let cancel = document.createElement("button");
  cancel.id = "form_cancel";
  cancel.innerText = "Cancel";
  let submit = document.createElement("button");
  submit.id = "form_submit";
  submit.innerText = "Login";
  form.method = "POST";
  form.action = "";
  form.append(header);
  form.append(adj_select);
  form.append(animal_select);
  button_div.append(submit);
  button_div.append(cancel);
  form.append(button_div);
  document.body.append(form);
  cancel.addEventListener("click", event => {
    event.preventDefault();
    form.remove();
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    store.Weathercoat.username = adj_select.value + animal_select.value;
    axios
      .get(
        `${process.env.WEATHER_SERVER}/users/name/${store.Weathercoat.username}`
      )
      .then(response => {
        let data = response.data[0];
        console.log("loaduser[form]:", data);
        if (data) {
          store.Weathercoat.username = data.name;
          store.Weathercoat.weather_country = "";
          store.Weathercoat.weather_state = "";
          store.Weathercoat.weather_city = "";
          store.Weathercoat.lat = data.lat;
          store.Weathercoat.lon = data.lon;
          store.Weathercoat.avatar = data.avatar;
          form.remove();
          router.navigate("/weathercoat");
        } else {
          axios
            .put(
              `${process.env.WEATHER_SERVER}/users/${store.Weathercoat.username}`,
              {
                data: {
                  lat: store.Weathercoat.lat,
                  lon: store.Weathercoat.lon,
                  ip: "",
                  avatar: store.Weathercoat.avatar
                }
              }
            )
            .then(response => {
              let data = response.data;
              console.log("putuser[form]:", data);
              store.Weathercoat.username = data.name;
              store.Weathercoat.weather_country = "";
              store.Weathercoat.weather_state = "";
              store.Weathercoat.weather_city = "";
              store.Weathercoat.lat = data.lat;
              store.Weathercoat.lon = data.lon;
              store.Weathercoat.avatar = data.avatar;
              form.remove();
              router.navigate("/weathercoat");
            });
        }
      });
  });
}

function loadUser(username) {
  axios
    .get(`${process.env.WEATHER_SERVER}/users/name/${username}`)
    .then(response => {
      let data = response.data[0];
      console.log("loaduser[params]:", data);
      if (data) {
        store.Weathercoat.username = data.name;
        store.Weathercoat.weather_country = "";
        store.Weathercoat.weather_state = "";
        store.Weathercoat.weather_city = "";
        store.Weathercoat.lat = data.lat;
        store.Weathercoat.lon = data.lon;
        store.Weathercoat.avatar = data.avatar;
        router.navigate("/Weathercoat");
      } else {
        axios
          .put(`${process.env.WEATHER_SERVER}/users/${username}`, {
            data: {
              lat: store.Weathercoat.lat,
              lon: store.Weathercoat.lon,
              ip: "",
              avatar: store.Weathercoat.avatar
            }
          })
          .then(response => {
            let data = response.data;
            console.log("putuser[params]:", data);
            store.Weathercoat.username = data.name;
            store.Weathercoat.weather_country = "";
            store.Weathercoat.weather_state = "";
            store.Weathercoat.weather_city = "";
            store.Weathercoat.lat = data.lat;
            store.Weathercoat.lon = data.lon;
            store.Weathercoat.avatar = data.avatar;
            router.navigate("/Weathercoat");
          });
      }
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
        if (store.Weathercoat.username) {
          axios
            .put(
              `${process.env.WEATHER_SERVER}/users/${store.Weathercoat.username}`,
              {
                data: {
                  lat: store.Weathercoat.lat,
                  lon: store.Weathercoat.lon,
                  ip: "",
                  avatar: store.Weathercoat.avatar
                }
              }
            )
            .then(response => {
              let data = response.data;
              console.log("putuser[radio]:", data);
              store.Weathercoat.username = data.name;
              store.Weathercoat.country = "";
              store.Weathercoat.state = "";
              store.Weathercoat.city = "";
              store.Weathercoat.lat = data.lat;
              store.Weathercoat.lon = data.lon;
              store.Weathercoat.avatar = data.avatar;
              router.navigate("/weathercoat");
            });
        } else {
          router.navigate("/weathercoat");
        }
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

    document.getElementById("login").addEventListener("click", () => {
      if (!document.getElementById("loginuser")) {
        loadUserForm();
      }
    });
  }

  if (state.view === "Weathercoat") {
    document.getElementById("login").style.display = "block";
  } else {
    document.getElementById("login").style.display = "none";
  }
}

function render(state = store.Home) {
  //Function for rendering the page
  console.log(state);
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
  store.Weathercoat.wind_speed = data.wind_speed;
  store.Weathercoat.wind_gust = data.wind_gust;
  store.Weathercoat.wind_direction = data.wind_direction;
  store.Weathercoat.alert = data.alert;
  if (data.restOfDays) {
    [
      store.Weathercoat.forecast_day1,
      store.Weathercoat.forecast_day2,
      store.Weathercoat.forecast_day3,
      store.Weathercoat.forecast_day4,
      store.Weathercoat.forecast_day5
    ] = data.restOfDays;
  }
  store.Weathercoat.weather_location = `${data.city}, ${data.state} (${data.lat}. ${data.lon}) ${data.country}`;
  store.Weathercoat.weather_city = data.city;
  store.Weathercoat.weather_state = data.state;
  store.Weathercoat.weather_country = data.country;
  store.Weathercoat.lat = data.lat;
  store.Weathercoat.lon = data.lon;
  store.Weathercoat.today_icon = data.today_icon;
  store.Weathercoat.load_avatar = chooseClothes(data);
  loadDateTime();
}

router.hooks({
  //Before hook used to set data before render
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    if (params.params) {
      if (params.params.name != store.Weathercoat.username) {
        console.log("USER:", params.params.name);
        loadUser(params.params.name);
      }
    }
    let weathercoat_links = [];
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
          .get("https://api.ipify.org?format=json")
          .then(response => {
            let ip = response.data.ip;
            console.log("IP", ip);
            weathercoat_links.push(
              axios.get(`${process.env.WEATHER_SERVER}/weather`, {
                params: {
                  city: store.Weathercoat.weather_city,
                  state: store.Weathercoat.weather_state,
                  country: store.Weathercoat.weather_country,
                  lat: store.Weathercoat.lat,
                  lon: store.Weathercoat.lon
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
                let weatherResponse = responses[0].value;
                if (weatherResponse.data.error) {
                  alert(weatherResponse.data.error);
                  weatherResponse.data.error = "";
                  done();
                } else {
                  setWeatherData(weatherResponse.data);
                  if (store.Weathercoat.username) {
                    axios
                      .put(
                        `${process.env.WEATHER_SERVER}/users/${store.Weathercoat.username}`,
                        {
                          data: {
                            lat: store.Weathercoat.lat,
                            lon: store.Weathercoat.lon,
                            ip: "",
                            avatar: store.Weathercoat.avatar
                          }
                        }
                      )
                      .then(response => {
                        let data = response.data;
                        console.log(
                          "putuser[before]:",
                          data,
                          store.Weathercoat
                        );
                      });
                  }
                }
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
          })
          .catch(error => {
            console.log("It Puked no IP", error);
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
    let weathercoat_links = [];
    if (view == "Weathercoat") {
      weathercoat_links.push(
        axios.get(`${process.env.WEATHER_SERVER}/weather`, {
          params: {
            city: store.Weathercoat.weather_city,
            state: store.Weathercoat.weather_state,
            country: store.Weathercoat.weather_country,
            lat: store.Weathercoat.lat,
            lon: store.Weathercoat.lon
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
          let weatherResponse = responses[0].value;
          if (weatherResponse.data.error) {
            console.log("Already: ", weatherResponse.data.error);
            alert(weatherResponse.data.error);
            weatherResponse.data.error = "";
            render(store.Weathercoat);
            return;
          } else {
            setWeatherData(weatherResponse.data);
            if (store.Weathercoat.username) {
              axios
                .put(
                  `${process.env.WEATHER_SERVER}/users/${store.Weathercoat.username}`,
                  {
                    data: {
                      lat: store.Weathercoat.lat,
                      lon: store.Weathercoat.lon,
                      ip: "",
                      avatar: store.Weathercoat.avatar
                    }
                  }
                )
                .then(response => {
                  let data = response.data;
                  console.log("putuser[already]:", data, store.Weathercoat);
                });
            }
          }
          if (responses.length > 1) {
            let inspirationResponse = responses[1].value;
            store.Weathercoat.quote = `'${inspirationResponse.data.quote}'`;
            store.Weathercoat.author = `- ${inspirationResponse.data.author}`;
          }
          render(store.Weathercoat);
        })
        .catch(error => {
          console.log("Promise broken", error);
          render(store.Weathercoat);
        });
    } else {
      render(store[view]);
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
