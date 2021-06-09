import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

// URL para desarrollo local
// axios.defaults.baseURL = "http://localhost:3000/api";

// URL de producción
axios.defaults.baseURL = "https://luasem-celn.herokuapp.com/api";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
