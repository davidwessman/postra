import { createApp } from "vue";
import VueLazyLoad from "vue3-lazyload";
import App from "./App.vue";
import "./index.css";
import "./registerServiceWorker";

const app = createApp(App);

app.use(VueLazyLoad);

app.mount("#app");
