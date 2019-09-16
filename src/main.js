import Vue from 'vue'
import Vuex from 'vuex'

import VueApexCharts from "vue-apexcharts";

import App from './App'

import store from './vuex/store'


Vue.config.productionTip = false;

Vue.component("apexchart", VueApexCharts);


new Vue({
  render: h => h(App),
  store,
}).$mount("#app");
