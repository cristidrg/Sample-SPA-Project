import 'jquery';
import 'kernl-ui';

import Vue from 'vue'
import App from './App.vue'

import $ from 'jquery';
$('.__toggler').on('click touch', () => {
  $('body').toggleClass('menu-open')
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
