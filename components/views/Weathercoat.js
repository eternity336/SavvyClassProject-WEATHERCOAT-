import html from "html-literal";
import edit from "../../Images/edit.png";
export default store => html`
  <section id="weathercoat">
    <div class="weather_view">
      <div class="left_view">
        <div>
          <p class="weather_sub_title">Real Temp</p>
          <p id="realTemp" class="weather_nums">
            ${store.realTemp}
            <img src = "https://openweathermap.org/img/wn/${store.today_icon}.png" alt="${store.today_icon}" width="100%"></img>
          </p>
          
        </div>
        <div>
          <p class="weather_sub_title">Visibility</p>
          <p id="visibility" class="weather_nums">
            ${store.visibility}
          </p>
        </div>
        <div>
          <p class="weather_sub_title">Inspirational Message</p>
          <br />
          <p id="inspiration_quote">${store.quote}</p>
          <br />
          <p id="inspiration_author">${store.author}</p>
        </div>
      </div>
      <div class="center_view">
        <div class="center_div">
          <p id="weather_date">
            ${store.weather_date}
          </p>
        </div>
        <div class="center_div">
          <p id="weather_time">
            ${store.weather_time}
          </p>
        </div>
        <div class="center_div">
          <img id="weather_location">
            ${store.weather_location}
            <img id="edit" src="${edit}" width="20px" alt="edit"/>
          </p>
          
        </div>
        <div class="avatar_div center_div">
          <div class="alert"><span>${store.alert}</span></div>
          <canvas id="avatar" alt="Weather Avatar"></canvas>
          <div>
            <input type="radio" name="player" id="avatar1" checked />
            <label for="avatar1">Avatar 1</label>
            <input type="radio" name="player" id="avatar2" />
            <label for="avatar2">Avatar 2</label>
            <input type="radio" name="player" id="avatar3" />
            <label for="avatar3">Avatar 3</label>
            <input type="radio" name="player" id="avatar4" />
            <label for="avatar4">Avatar 4</label>
          </div>
        </div>
      </div>
      <div class="right_view">
        <div class="forecast">
          <p class="weather_sub_title">5 Day Forecast</p>
          <div class="forecast_div">
            <p class="forecast_date">${store.restOfDays[0].date}</p>
            <p class="forecast_temp">${store.restOfDays[0].temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.restOfDays[0].icon}.png" alt="${store.restOfDays[0].icon}"></img>
          </div>
          <div class="forecast_div">
            <p class="forecast_date">${store.restOfDays[1].date}</p>
            <p class="forecast_temp">${store.restOfDays[1].temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.restOfDays[1].icon}.png" alt="${store.restOfDays[1].icon}"></img>
          </div>
          <div class="forecast_div">
            <p class="forecast_date">${store.restOfDays[2].date}</p>
            <p class="forecast_temp">${store.restOfDays[2].temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.restOfDays[2].icon}.png" alt="${store.restOfDays[2].icon}"></img>
          </div>
          <div class="forecast_div">
            <p class="forecast_date">${store.restOfDays[3].date}</p>
            <p class="forecast_temp">${store.restOfDays[3].temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.restOfDays[3].icon}.png" alt="${store.restOfDays[3].icon}"></img>
          </div>
          <div class="forecast_div">
            <p class="forecast_date">${store.restOfDays[4].date}</p>
            <p class="forecast_temp">${store.restOfDays[4].temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.restOfDays[4].icon}.png" alt="${store.restOfDays[4].icon}"></img>
          </div>
        </div>
        <div class="right_div">
          <p class="weather_sub_title">Real Feel Temp</p>
          <p id="realFeel" class="weather_nums">
            ${store.realFeel}
          </p>
        </div>
        <div class="right_div">
          <p class="weather_sub_title">Humidity</p>
          <p id="humidity" class="weather_nums">
            ${store.humidity}
          </p>
        </div>
      </div>
    </div>
  </section>
`;
