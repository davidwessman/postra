import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./registerServiceWorker";

const app = createApp(App);
app.mount("#app");
