import { Header, Footer, Nav, Main } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav()}
    ${Main(state)}
    ${Footer()}
  `;
  router.updatePageLinks();
  console.log(state);
}

const router = new Navigo("/");
router.on("/", () => render(store.Home)).resolve();
router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
