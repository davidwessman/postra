import Vue from "vue";
import PortalVue from "portal-vue";
import VueLazyLoad from "vue-lazyload";
import App from "./App.vue";
import "./main.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(PortalVue);
Vue.use(VueLazyLoad);

new Vue({
  render: h => h(App)
}).$mount("#app");
