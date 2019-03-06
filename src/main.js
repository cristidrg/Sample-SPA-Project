import 'jquery';
import 'kernl-ui';

import Vue from 'vue'
import App from './App.vue'

import $ from 'jquery';
import 'formstone/src/js/navigation';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

$("#filter_menu").navigation({
  type: "overlay",
  gravity: "left",
  maxWidth: "700px",
  labels: { closed: "Filter" }
});

$("#chart_menu").navigation({
  type: "overlay",
  gravity: "right",
  maxWidth: "700px",
  labels: { closed: "Browse" }
});

$('.__toggler').on('click touch', () => {
  $('body').toggleClass('menu-open')
});
