import html from "html-literal";
export default () => html`
  <section id="weathercoat">
    <div class="weather_view">
      <div class="left_view">
        <div><p>Inspirational Message</p></div>
        <div>
          <p>Real Temp</p>
          <p id="realTemp" class="weather_nums"></p>
        </div>
        <div>
          <p>Visibility</p>
          <p id="visibility" class="weather_nums"></p>
        </div>
      </div>
      <div class="center_view">
        <div class="center_div"><p id="weather_date">Date</p></div>
        <div class="center_div"><p id="weather_time">Time</p></div>
        <div class="center_div"><p id="weather_location">Location</p></div>
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
          <p>7 Day Forecast</p>
          <p>Today</p>
          <p>Day 2</p>
          <p>Day 3</p>
          <p>Day 4</p>
          <p>Day 5</p>
        </div>
        <div>
          <p>Real Feel Temp</p>
          <p id="realFeel" class="weather_nums"></p>
        </div>
        <div>
          <p>Humidity</p>
          <p id="humidity" class="weather_nums"></p>
        </div>
      </div>
    </div>
  </section>
`;
