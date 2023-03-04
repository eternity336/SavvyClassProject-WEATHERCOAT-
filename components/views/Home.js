import html from "html-literal";
import cloud from "../../Images/cloud.png";

export default () => html`
  <section id="clouds_home">
    <p id="title_text">WELCOME TO WEATHERCOAT</p>
    <div class="clouds">
      <img
        id="cloud_right"
        class="cloud"
        src="${cloud}"
        alt="cloud"
      />
      <img
        id="cloud_left"
        class="cloud"
        src="${cloud}"
        alt="cloud"
      />
    </div>
  </section>
`;
