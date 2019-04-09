import 'kernl-ui/dist/scripts/main.js'
import "@babel/polyfill";
import 'formstone/src/js/navigation'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAnimateNumber from 'vue-animate-number'
import ToggleButton from 'vue-js-toggle-button'
import $ from 'jquery'
import vueScrollto from 'vue-scrollto'

import App from './App.vue'
import { Graduate, Employment, CoopParticipation, Industries, Outcomes, Salaries } from './routes/'
import SeeTheNumbers from './components/SeeTheNumbers';
import router from './routing';

Es6Promise.polyfill();
Vue.config.productionTip = false

Vue.use(vueScrollto)
Vue.use(VueRouter)
Vue.use(VueAnimateNumber)
Vue.use(ToggleButton)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

new Vue({
  render: h => h(SeeTheNumbers)
}).$mount('#hero_btn')

let $filter = $('#filter_menu')
let $browse = $('#chart_menu')

$filter.navigation({
  type: 'overlay',
  gravity: 'left',
  maxWidth: '991px',
  labels: { closed: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filter' }
})

$('.filter-menu__apply', $filter).on('click touch', (e) => {
  e.preventDefault()
  $filter.navigation('close')
})

$browse.navigation({
  type: 'overlay',
  gravity: 'right',
  maxWidth: '991px',
  labels: { closed: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> Segments' }
})

$('.__link', $browse).on('click touch', () => {
  $browse.navigation('close')
})
