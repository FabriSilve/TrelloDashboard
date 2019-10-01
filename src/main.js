import 'babel-polyfill';
import Vue from 'vue'
import VueApexCharts from "vue-apexcharts";

import App from './App'
import store from './store'


Vue.config.productionTip = false;

Vue.component("apexchart", VueApexCharts);

window.Apex = {
  chart: {
    foreColor: '#ccc',
    toolbar: { show: false },
    animations: { enabled: false },
  },
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  dataLabels: { enabled: false },
  tooltip: { theme: 'dark' },
  grid: {
    borderColor: "#535A6C",
    xaxis: {
      lines: { show: true },
    },
  },
};

new Vue({
  render: h => h(App),
  store,
}).$mount("#app");
