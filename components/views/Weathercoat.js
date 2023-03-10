import html from "html-literal";
import edit from "../../Images/edit.png";
export default store => html`
  <section id="weathercoat">
    <div class="weather_view">
      <div class="left_view">
        <div>
          <p class="weather_sub_title">Inspirational Message</p>
          <br />
          <p id="inspiration_quote">${store.quote}</p>
          <br />
          <p id="inspiration_author">${store.author}</p>
        </div>
        <div>
          <p class="weather_sub_title">Real Temp</p>
          <p id="realTemp" class="weather_nums">
            ${store.realTemp}
          </p>
        </div>
        <div>
          <p class="weather_sub_title">Visibility</p>
          <p id="visibility" class="weather_nums">
            ${store.visibility}
          </p>
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
          <div class="alert"><span>ALERTS</span></div>
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
        <div>
          <p class="weather_sub_title">7 Day Forecast</p>
          <p>Today</p>
          <p>Day 2</p>
          <p>Day 3</p>
          <p>Day 4</p>
          <p>Day 5</p>
        </div>
        <div>
          <p class="weather_sub_title">Real Feel Temp</p>
          <p id="realFeel" class="weather_nums">
            ${store.realFeel}
          </p>
        </div>
        <div>
          <p class="weather_sub_title">Humidity</p>
          <p id="humidity" class="weather_nums">
            ${store.humidity}
          </p>
        </div>
      </div>
    </div>
  </section>
`;
