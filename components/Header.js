import html from "html-literal";
import menuSun from '../Images/menusun.png';
import menuHome from '../Images/home.png';
import menuAbout from '../Images/info.png';
import menuContact from '../Images/contact.png';
import menuWeatherCoat from '../Images/sun.png';

export default (state) => html`
<header class="home_header">
  <div id ='menu_bar'>
      <img id="menu_button_icon" src="${menuSun}" alt="Menu Button">
      <div class="menu_button home_button">
        <a href="Home" data-navigo>
            <img src="${menuHome}" alt="HOME"><br>
            HOME
        </a>
      </div>
      <div class="menu_button">
        <a href="About" data-navigo>
            <img src="${menuAbout}" alt="ABOUT"><br>
            ABOUT
        </a>  
      </div>
      <div class="menu_button">
        <a href="Contact" data-navigo>
            <img src="${menuContact}" alt="CONTACT"><br>
            CONTACT
        </a>
      </div>
      <div class="menu_button menu_last">
        <a href="Weathercoat" data-navigo>  
              <img src="${menuWeatherCoat}" alt="WEATHERCOAT"><br>
              WEATHERCOAT
        </a>
      </div>
  </div>
</header>`;