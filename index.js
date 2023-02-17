import { Header, Footer, Nav, Main } from './components';
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(store.Links)}
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
    ":view": (params) => {
      let view = capitalize(params.data.view);
      render(store[view]);
    },
  })
  .resolve();

  //add menu toggle to bars icon in nav bar
document.querySelector(".fa-bars").addEventListener("click", () => {
  document.querySelector("nav > ul").classList.toggle("hidden--mobile");
});
