import Vue from "vue";
import PortalVue from "portal-vue";
import App from "./App.vue";
import "./main.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(PortalVue)

new Vue({
  render: h => h(App)
}).$mount("#app");
