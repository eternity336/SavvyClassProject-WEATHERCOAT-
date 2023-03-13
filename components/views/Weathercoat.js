import html from "html-literal";
import edit from "../../Images/edit.png";
import compass from "../../Images/compass.png";
import * as images from "../../Images";

export default store => html`
  <section id="weathercoat">
    <div class="weather_view">
      <div class="left_view">
        <div>
          <p class="weather_sub_title">Real Temp</p>
          <p id="realTemp" class="weather_nums">
            ${store.realTemp}
            <img src = "https://openweathermap.org/img/wn/${store.today_icon}@2x.png" alt="${store.today_icon}"></img>
          </p>
          
        </div>
        <div>
          <p class="weather_sub_title">Visibility</p>
          <p id="visibility" class="weather_nums">
            ${store.visibility}
          </p>
        </div>
        <div>
          <p class="weather_sub_title">Wind</p>
          <p class="wind_nums">
            Speed: ${store.wind_speed} 
          </p>
          <p class="wind_nums">
            Direction: &ensp;<img src="${compass}" style="height: 30px; transform: rotate(${store.wind_direction}deg)">
          </p>
          <p class="wind_nums">
            Gust: ${store.wind_gust}
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
          <img id="avatar" src="${
            images[store.avatar + "_" + store.load_avatar]
          }" alt="Weather Avatar"></img>
          <div>
            <input type="radio" name="player" id="cat" checked />
            <label for="cat">Cat</label>
            <input type="radio" name="player" id="dog" />
            <label for="dog">Dog</label>
            <input type="radio" name="player" id="frog" />
            <label for="frog">Frog</label>
            <input type="radio" name="player" id="giraffe" />
            <label for="giraffe">Giraffe</label>
            <input type="radio" name="player" id="ox" />
            <label for="ox">Ox</label>
          </div>
        </div>
      </div>
      <div class="right_view">
        <div class="forecast">
          <p class="weather_sub_title">5 Day Forecast</p>
          <div class="forecast_div">
            <p class="forecast_date">${store.forecast_day1.date}</p>
            <p class="forecast_temp">${store.forecast_day1.temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.forecast_day1.icon}.png" alt="${store.forecast_day1.icon}"></img>
          </div>
          <div class="forecast_div">
            <p class="forecast_date">${store.forecast_day2.date}</p>
            <p class="forecast_temp">${store.forecast_day2.temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.forecast_day2.icon}.png" alt="${store.forecast_day2.icon}"></img>
          </div>
          <div class="forecast_div">
            <p class="forecast_date">${store.forecast_day3.date}</p>
            <p class="forecast_temp">${store.forecast_day3.temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.forecast_day3.icon}.png" alt="${store.forecast_day3.icon}"></img>
          </div>
          <div class="forecast_div">
            <p class="forecast_date">${store.forecast_day4.date}</p>
            <p class="forecast_temp">${store.forecast_day4.temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.forecast_day4.icon}.png" alt="${store.forecast_day4.icon}"></img>
          </div>
          <div class="forecast_div">
            <p class="forecast_date">${store.forecast_day5.date}</p>
            <p class="forecast_temp">${store.forecast_day5.temp}\xBAF</p>
            <img src = "https://openweathermap.org/img/wn/${store.forecast_day5.icon}.png" alt="${store.forecast_day5.icon}"></img>
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
